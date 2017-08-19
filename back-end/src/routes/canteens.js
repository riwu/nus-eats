const express = require('express');
const { Canteen } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const canteens = await Canteen.findAll();
  res.json(canteens);
});

module.exports = router;
