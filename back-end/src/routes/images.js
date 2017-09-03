const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'photos/' });
const asyncMiddleware = require('../utilities/async');
const fs = require('fs');

module.exports = (db, s3Bucket) => {

  router.post('/', upload.single('photo'), asyncMiddleware(async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);

    s3Bucket.upload({
      Body: fs.createReadStream(req.file.path),
      Key: req.file.path
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  }));

  router.get('/:key', asyncMiddleware(async (req, res, next) => {
    const params = { Key: 'photos/' + req.params.key };
    const url = s3Bucket.getSignedUrl('getObject', params);
    res.json({url});
  }));

  router.post('/:imageId/like', asyncMiddleware(async (req, res, next) => {
  }));

  router.post('/:imageId/unlike', asyncMiddleware(async (req, res, next) => {
  }));

  return router;
}