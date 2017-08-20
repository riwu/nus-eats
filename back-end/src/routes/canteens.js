const express = require('express');
const { Canteen, Store } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const canteens = await Canteen.findAll();
  res.json({canteens});
});

router.get('/:canteenId/stores', async (req, res, next) => {
  const stores = await Store.findAll({
    where: {canteenId: req.params.canteenId}
  });
  res.json({stores});
});

module.exports = router;
