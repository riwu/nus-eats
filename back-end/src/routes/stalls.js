const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../utilities/async');
const Boom = require('boom');

module.exports = (db, authenticateMiddleware) => {
  router.get('/', asyncMiddleware(async (req, res, next) => {
    const stalls = await db['stall'].findAll({
      order: [
        ['name', 'ASC']
      ],
      attributes: {
        include: [[ db.sequelize.fn('AVG', db.sequelize.col('ratings.value')), 'averageRating' ]]
      },
      include: [{
        model: db['rating'],
        attributes: []
      }],
      group: ['stall.id']
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

  router.put('/:stallId/ratings', authenticateMiddleware, asyncMiddleware(async (req, res, next) => {
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

  router.delete('/:stallId/ratings', authenticateMiddleware, asyncMiddleware(async (req, res, next) => {
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

  return router;
}
