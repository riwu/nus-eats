const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../utilities/async');
const Boom = require('boom');

module.exports = (db) => {
  router.get('/', asyncMiddleware(async (req, res, next) => {
    const stalls = await db['stall'].findAll({
      order: [
        ['name', 'ASC']
      ],
      attributes: {
        include: [[ db.sequelize.fn('AVG', db.sequelize.col('ratings.value')), 'average_rating' ]]
      },
      include: [{
        model: db['rating'],
        attributes: []
      }],
      group: ['stall.id']
    });
    res.json({stalls});
  }));

  router.get('/:id', asyncMiddleware(async (req, res, next) => {
    const stall = await db['stall'].findById(req.params.id, {
      attributes: {
        include: [[ db.sequelize.fn('AVG', db.sequelize.col('ratings.value')), 'average_rating' ]]
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

  router.get('/:id/ratings', asyncMiddleware(async (req, res, next) => {
    const ratings = await db['rating'].findAll({
      where: { stallId: req.params.id },
      order: [
        [ 'updatedAt', 'DESC' ]
      ]
    });
    res.json({ratings});
  }));

  return router;
}
