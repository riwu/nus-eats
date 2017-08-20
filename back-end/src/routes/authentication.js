const express = require('express');
const fb = require('../services/facebook');
const jwt = require('jsonwebtoken');
const router = express.Router();

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
      const payload = {
        user: profile,
        accessToken: accessToken.access_token
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
      res.status(401).json({errors: ['Invalid access token.']});
    });
});

module.exports = router;
