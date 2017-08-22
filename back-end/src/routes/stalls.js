const express = require('express');
const { Stall } = require('../models');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const stall = await Stall.findById(req.params.id);

  if (stall) {
    res.json({stall});
  } else {
    res.status(404).json({errors: ['Stall not found.']})
  }
});

module.exports = router;
