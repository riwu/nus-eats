const express = require('express');
const { Store } = require('../models');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const store = await Store.findById(req.params.id);

  if (store) {
    res.json({store});
  } else {
    res.status(404).json({errors: ['Store not found.']})
  }
});

module.exports = router;
