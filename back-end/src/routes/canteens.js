const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', async (req, res, next) => {
    const canteens = await db['Canteen'].findAll({
      order: [
        ['name', 'ASC']
      ]
    });
    res.json({canteens});
  });
  
  router.get('/:canteenId/stalls', async (req, res, next) => {
    const stalls = await db['Stall'].findAll({
      where: { canteen_id: req.params.canteenId },
      order: [
        ['name', 'ASC']
      ]
    });
    res.json({stalls});
  });

  return router;
}