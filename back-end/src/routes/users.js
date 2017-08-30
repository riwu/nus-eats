const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../utilities/async');
const { getFacebookData } = require('../services/facebook');

module.exports = (db) => {
    router.get('/appointments/initiated', asyncMiddleware(async (req, res, next) => {
      const appointments = await db['appointment'].findAll({
        where: { userId: req.user.id }
      });
      res.json({appointments});
    }));

    router.get('/appointments/joined', asyncMiddleware(async (req, res, next) => {
      const appointments = await db['appointment'].findAll({
        where: { attendees: { $contains: [req.user.id] }}
      });
      res.json({appointments});
    }));

    router.get('/friends', asyncMiddleware(async (req, res, next) => {
      const friends = await getFacebookData('me/friends', req.user.facebookAccessToken);
      res.json({friends});
    }));

    router.get('/friends/appointments/initiated', asyncMiddleware(async (req, res, next) => {
      const friends = await getFacebookData('me/friends', req.user.facebookAccessToken);
      const friendsId = friends.reduce((list, friend) => {
        list.push(friend.id);
        return list;
      }, []);

      const appointments = await db['appointment'].findAll({
        where: { userId: { $in: friendsId }}
      });
      res.json({appointments});
    }));

    router.get('/friends/appointments/joined', asyncMiddleware(async (req, res, next) => {
      const friends = await getFacebookData('me/friends', req.user.facebookAccessToken);
      const friendsId = friends.reduce((list, friend) => {
        list.push(friend.id);
        return list;
      }, []);

      const appointments = await db['appointment'].findAll({
        where: { attendees: { $overlap: friendsId }}
      });
      res.json({appointments});
    }));

    return router;
};