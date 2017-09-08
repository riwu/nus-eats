const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Boom = require('boom');
const uuidv4 = require('uuid/v4');
const asyncMiddleware = require('../utilities/async');
const removeElement = require('../utilities/array');

const router = express.Router();

const createUuid = () => {
  return (req, res, next) => {
    req.uuid = uuidv4();
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
    }),
    limits: {fileSize: 10000000 }
  });
}

module.exports = (db, s3) => {

  router.post('/', createUuid(), multerMiddleware(s3).single('photo'), asyncMiddleware(async (req, res, next) => {
    const photo = await db['photo'].create({
      uuid: req.uuid,
      stallId: req.body.stallId,
      userId: req.user.id
    });

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