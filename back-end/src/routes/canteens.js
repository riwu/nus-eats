const express = require('express');
const router = express.Router();
const request = require('request-promise');
const asyncMiddleware = require('../utilities/async');

let getCrowdValue = async () => {
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
    var canteens = await db['canteen'].findAll({
      order: [
        ['name', 'ASC']
      ]
    });

    canteens.map( c => {
      var canteen = c.toJSON();
      crowd.Cameras.forEach(camera => {
        if (camera._id == canteen.crowd_id) {
          canteen.crowdValue = camera.crowdValue;
        }
      });
      delete canteen.crowd_id;
      return canteen;
    });

    res.json({canteens});
  }));

  return router;
}