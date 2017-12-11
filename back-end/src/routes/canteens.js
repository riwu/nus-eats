const express = require('express');
const asyncMiddleware = require('../utilities/async');
const getCrowdValue = require('../services/crowd');

const router = express.Router();

module.exports = (db, s3) => {
  router.get('/', asyncMiddleware(async (req, res, next) => {
    const crowd = req.query.getCrowd ? await getCrowdValue() : { Cameras: [] };
    const canteens = await db['canteen'].findAll({
      order: [
        ['name', 'ASC']
      ]
    });

    canteens.map(canteen => {
      crowd.Cameras.forEach(camera => {
        if (camera._id == canteen.dataValues.crowdId) {
          canteen.dataValues.crowdValue = camera.crowdValue;
        }
      });

      canteen.dataValues.imageUrl = s3.getSignedUrl('getObject', {
        Bucket: process.env.S3_BUCKET,
        Key: process.env.S3_CANTEENS_FOLDER + canteen.dataValues.uuid
      });

      delete canteen.dataValues.uuid;
      delete canteen.dataValues.crowdId;
      return canteen;
    });

    res.json({canteens});
  }));


  return router;
}
