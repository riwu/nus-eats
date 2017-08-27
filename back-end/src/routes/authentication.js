const express = require('express');
const router = express.Router();
const fb = require('../services/facebook');
const jwt = require('jsonwebtoken');
const Boom = require('boom');

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

module.exports = router;
