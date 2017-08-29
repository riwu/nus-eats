const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../utilities/async');

module.exports = (db) => {
    router.get('/:userId/appointments', asyncMiddleware(async (req, res, next) => {
      const appointments = await db['appointment'].findAll({
        where: { userId: req.params.userId }
      });
      res.json({appointments});
    }));

    return router;
};