const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../utilities/async');
const Boom = require('boom');

module.exports = (db) => {
  router.get('/', asyncMiddleware(async (req, res, next) => {
    const stalls = await db['Stall'].findAll();
    res.json({stalls});
  }));

  router.get('/:id', asyncMiddleware(async (req, res, next) => {
    const stall = await db['Stall'].findById(req.params.id, {
      attributes: {
        include: [[ db.sequelize.fn('AVG', db.sequelize.col('ratings.value')), 'average_rating' ]]
      },
      include: [{
        model: db['Rating'],
        as: 'ratings',
        attributes: []
      }],
      group: ['Stall.id']
    });

    if (!stall) {
      throw Boom.notFound('Record not found.');
    }
    res.json({stall});
  }));

  router.get('/:id/ratings', asyncMiddleware(async (req, res, next) => {
    const ratings = await db['Rating'].findAll({
      where: { stall_id: req.params.id },
      order: [
        [ 'updated_at', 'DESC' ]
      ]
    });
    res.json({ratings});
  }));

  return router;
}
