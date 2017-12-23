const express = require('express');
const asyncMiddleware = require('../utilities/async');
const { getFacebookData } = require('../services/facebook');

const router = express.Router();

module.exports = (db, s3) => {
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

    router.get('/friends/appointments/initiated/combined', asyncMiddleware(async (req, res, next) => {
      const friends = await getFacebookData('me/friends', req.user.facebookAccessToken);
      const friendsId = friends.reduce((list, friend) => {
        list.push(friend.id);
        return list;
      }, []);
      const combinedId = friendsId.concat([req.user.id]);

      const appointments = await db['appointment'].findAll({
        where: { userId: { $in: combinedId }},
        paranoid: false
      });
      res.json({appointments});
    }));

    router.get('/friends/appointments/joined/combined', asyncMiddleware(async (req, res, next) => {
      const friends = await getFacebookData('me/friends', req.user.facebookAccessToken);
      const friendsId = friends.reduce((list, friend) => {
        list.push(friend.id);
        return list;
      }, []);
      const combinedId = friendsId.concat([req.user.id]);

      const appointments = await db['appointment'].findAll({
        where: { attendees: { $overlap: combinedId }}
      });
      res.json({appointments});
    }));

    router.get('/photos', asyncMiddleware(async (req, res, next) => {
      const photos = await db['photo'].findAll({
        where: {
          userId: req.user.id
        }
      });

      photos.map(photo => {
        photo.dataValues.url = s3.getSignedUrl('getObject', {
          Bucket: process.env.S3_BUCKET,
          Key: photo.uuid
        });
        return photo;
      });

      res.json({photos});
    }));

    router.get('/ratings', asyncMiddleware(async (req, res, next) => {
      const ratings = await db['rating'].findAll({
        where: {
          userId: req.user.id
        }
      });

      res.json({ratings});
    }));

    return router;
};