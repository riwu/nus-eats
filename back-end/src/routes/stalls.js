const express = require('express');
const Boom = require('boom');
const passport = require('passport');
const asyncMiddleware = require('../utilities/async');
const { authenticateJwt } = require('../security/jwt');

const router = express.Router();

module.exports = (db, s3) => {

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
