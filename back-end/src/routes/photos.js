const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Boom = require('boom');
const asyncMiddleware = require('../utilities/async');
const removeElement = require('../utilities/array');

const router = express.Router();

const createDBentry = (db) => {
  return async (req, res, next) => {
    const photo = await db['photo'].create({
      userId: req.user.id
    });
    req.uuid = photo.uuid;
    next();
  }
}

const multerMiddleware = (s3) => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, req.uuid);
      }
    })
  });
}

module.exports = (db, s3) => {

  router.post('/', createDBentry(db), multerMiddleware(s3).single('photo'), asyncMiddleware(async (req, res, next) => {
    const photo = await db['photo'].findById(req.uuid);

    if (!photo) {
      throw Boom.notFound('Record not found.');
    }

    await photo.update({stallId: req.body.stallId});

    photo.dataValues.url = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: photo.uuid
    });

    res.json({photo});
  }));

  router.post('/:photoId/like', asyncMiddleware(async (req, res, next) => {
    const photo = await db['photo'].findById(req.params.photoId);

    if (!photo) {
      throw Boom.notFound('Record not found.');
    }

    photo.liked.forEach(user => {
      if (user == req.user.id) {
        throw Boom.forbidden('User has already liked photo.');
      }
    });

    photo.liked.push(req.user.id);

    await photo.update({liked: photo.liked});

    photo.dataValues.url = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: photo.uuid
    });

    res.json({photo});
  }));

  router.post('/:photoId/unlike', asyncMiddleware(async (req, res, next) => {
    const photo = await db['photo'].findById(req.params.photoId);

    if (!photo) {
      throw Boom.notFound('Record not found.');
    }

    removeElement(photo.liked, req.user.id);
    await photo.update({liked: photo.liked});

    photo.dataValues.url = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: photo.uuid
    });

    res.json({photo});
  }));

  router.delete('/:photoId', asyncMiddleware(async (req, res, next) => {
    const photo = await db['photo'].findById(req.params.photoId);

    if (!photo) {
      throw Boom.notFound('Record not found.');
    }

    if (photo.userId != req.user.id) {
      throw Boom.forbidden('Only photo uploader can delete the photo.');
    }

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: photo.uuid
    };
    s3.deleteObject(params, async (err, data) => {
      if (err) {
        next(Boom.badGateway(err.message));
      } else {
        await photo.destroy();
        res.status(204).send();
      }
    });

  }));

  return router;
}