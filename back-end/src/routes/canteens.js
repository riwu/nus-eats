const express = require('express');
const router = express.Router();
const request = require('request-promise');
const asyncMiddleware = require('../utilities/async');

async function getCrowdValue() {
  const options = {
    method: 'GET',
    uri: 'http://nusfoodie-camera.simple-url.com/api/crowd',
    qs: {
      token: '12345'
    },
    json: true
  };
  return request(options);
}

module.exports = (db) => {
  router.get('/', asyncMiddleware(async (req, res, next) => {
    const crowd = await getCrowdValue();
    var canteens = await db['Canteen'].findAll({
      order: [
        ['name', 'ASC']
      ]
    });

    canteens.map( c => {
      var canteen = c.toJSON();
      crowd.Cameras.forEach(camera => {
        if (camera._id == canteen.crowd_id) {
          canteen.crowd_value = camera.crowdValue;
        }
      });
      delete canteen.crowd_id;
      return canteen;
    });

    res.json({canteens});
  }));

  router.get('/:canteenId/stalls', asyncMiddleware(async (req, res, next) => {
    const stalls = await db['Stall'].findAll({
      where: { canteen_id: req.params.canteenId },
      order: [
        ['name', 'ASC']
      ],
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
    res.json({stalls});
  }));

  return router;
}