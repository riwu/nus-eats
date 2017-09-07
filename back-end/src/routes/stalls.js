const express = require('express');
const Boom = require('boom');
const passport = require('passport');
const asyncMiddleware = require('../utilities/async');
const { authenticateJwt } = require('../security/jwt');

const router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');
const download = require('image-downloader');

var fs = require('fs'),
request = require('request');

var downloader = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const multerMiddleware = (s3) => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, 'default/' + req.params.photoId);
      }
    })
  });
}

module.exports = (db, s3) => {

  router.post('/:photoId', multerMiddleware(s3).single('photo'), asyncMiddleware(async (req, res, next) => {
    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: 'default/' + req.params.photoId
    });

    res.json({url});
  }));

  router.get('/download', asyncMiddleware(async (req, res, next) => {
    const stalls = await db['stall'].findAll({
      order: [
        ['name', 'ASC']
      ],
      attributes: {
        include: [
          [db.sequelize.fn('AVG', db.sequelize.col('ratings.value')), 'averageRating']
        ]
      },
      include: [{
        model: db['rating'],
        attributes: []
      }],
      group: ['stall.id']
    });

    stalls.map(async (stall) => {
      stall.dataValues.imageUrl = s3.getSignedUrl('getObject', {
        Bucket: process.env.S3_BUCKET,
        Key: process.env.S3_DEFAULT_FOLDER + stall.dataValues.uuid
      });

      downloader(stall.dataValues.imageUrl, '~/Downloads' + stall.dataValues.uuid, () => {
        console.log('Downloaded:' + stall.dataValues.uuid);
      });

      return stall;
    });



    res.send('ok');
  }));

  router.get('/', asyncMiddleware(async (req, res, next) => {
    const stalls = await db['stall'].findAll({
      order: [
        ['name', 'ASC']
      ],
      attributes: {
        include: [
          [db.sequelize.fn('AVG', db.sequelize.col('ratings.value')), 'averageRating']
        ]
      },
      include: [{
        model: db['rating'],
        attributes: []
      }],
      group: ['stall.id']
    });

    stalls.map(stall => {
      stall.dataValues.imageUrl = s3.getSignedUrl('getObject', {
        Bucket: process.env.S3_BUCKET,
        Key: process.env.S3_DEFAULT_FOLDER + stall.dataValues.uuid
      });
      delete stall.dataValues.uuid;
      return stall;
    });

    res.json({stalls});
  }));

  router.get('/:stallId', asyncMiddleware(async (req, res, next) => {
    const stall = await db['stall'].findById(req.params.stallId, {
      attributes: {
        include: [[ db.sequelize.fn('AVG', db.sequelize.col('ratings.value')), 'averageRating' ]]
      },
      include: [{
        model: db['rating'],
        attributes: []
      }],
      group: ['stall.id']
    });

    if (!stall) {
      throw Boom.notFound('Record not found.');
    }

    stall.dataValues.imageUrl = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: process.env.S3_DEFAULT_FOLDER + stall.dataValues.uuid
    });
    delete stall.dataValues.uuid;

    res.json({stall});
  }));

  router.get('/:stallId/ratings', asyncMiddleware(async (req, res, next) => {
    const ratings = await db['rating'].findAll({
      where: { stallId: req.params.stallId },
      order: [
        [ 'updatedAt', 'DESC' ]
      ]
    });
    res.json({ratings});
  }));

  router.put('/:stallId/ratings', authenticateJwt(passport), asyncMiddleware(async (req, res, next) => {
    let rating = await db['rating'].findOne({
      where: {
        stallId: req.params.stallId,
        userId: req.user.id
      }
    });

    if (rating) {
      await rating.update({
        value: req.body.rating.value
      });
    } else {
      rating = await db['rating'].create({
        stallId: req.params.stallId,
        userId: req.user.id,
        value: req.body.rating.value
      });
    }

    res.json({rating});
  }));

  router.delete('/:stallId/ratings', authenticateJwt(passport), asyncMiddleware(async (req, res, next) => {
    const rating = await db['rating'].findOne({
      where: {
        stallId: req.params.stallId,
        userId: req.user.id
      }
    });

    if (!rating) {
      throw Boom.notFound('Record not found.');
    }

    await rating.destroy();
    res.status(204).send();
  }));

  router.get('/:stallId/photos', asyncMiddleware(async (req, res, next) => {
    const photos = await db['photo'].findAll({
      where: {
        stallId: req.params.stallId
      }
    });

    photos.map(photo => {
      photo.dataValues.url = s3.getSignedUrl('getObject', {
        Bucket: process.env.S3_BUCKET,
        Key: photo.uuid
      });
      return photo;
    });

    res.json({photos});
  }));

  return router;
}
