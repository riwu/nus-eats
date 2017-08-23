const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', async (req, res, next) => {
    const canteens = await db['Canteen'].findAll();
    res.json({canteens});
  });
  
  router.get('/hello', async (req, res, next) => {
    res.send('Hello');
  });
  
  router.get('/:canteenId/stores', async (req, res, next) => {
    const stalls = await db['Stall'].findAll({
      where: {canteenId: req.params.canteenId}
    });
    res.json({stalls});
  });

  return router;
}