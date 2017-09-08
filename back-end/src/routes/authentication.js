const express = require('express');
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const { fb } = require('../services/facebook');
const asyncMiddleware = require('../utilities/async');

const router = express.Router();

module.exports = (db, s3) => {

  router.post('/login', (req, res, next) => {
    const shortAccessToken = req.body.accessToken;

    const accessTokenPromise = new Promise((resolve, reject) => {
      fb.api('oauth/access_token', {
        grant_type: 'fb_exchange_token',
        fb_exchange_token: shortAccessToken,
        client_id: fb.options().appId,
        client_secret: fb.options().appSecret
      }, (res) => {
        if (!res || res.error) {
          reject();
        } else {
          resolve(res);
        }
      });
    });

    const profilePromise = new Promise((resolve, reject) => {
      fb
        .withAccessToken(shortAccessToken)
        .api('me', (res) => {
          if (!res || res.error) {
            reject();
          } else {
            resolve(res);
          }
        });
    });

    Promise
      .all([accessTokenPromise, profilePromise])
      .then(([accessToken, profile]) => {
        const user = {
          ...profile,
          facebookAccessToken: accessToken.access_token
        };

        const payload = {
          user
        };

        const options = {
          expiresIn: accessToken.expires_in
        };

        jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
          res.json({
            token,
            facebookToken: accessToken.access_token
          });
        });
      })
      .catch(() => {
        next(Boom.unauthorized('Invalid access token.'));
      });
  });

  router.post('/deauthorize', asyncMiddleware(async (req, res, next) => {
    const signedRequestValue = req.body.signed_request;
    const signedRequest = fb.parseSignedRequest(signedRequestValue);

    if (!signedRequest) {
      throw Boom.forbidden('Facebook validation failed.');
    }

    const currentUserId = signedRequest.user_id;

    await db['appointment'].destroy({
      where: {
        userId: currentUserId
      }
    });

    await db['rating'].destroy({
      where: {
        userId: currentUserId
      }
    });

    const photos = await db['photo'].findAll({
      where: {
        userId: currentUserId
      }
    });

    photos.forEach(photo => {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: photo.uuid
      };
      s3.deleteObject(params, async (err, data) => {
        if (err) {
          next(Boom.badGateway(err.message));
        }
      });
      await photo.destroy();
    });

    res.status(204).send();
  }));

  return router;
}

