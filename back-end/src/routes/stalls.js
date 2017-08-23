const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id', async (req, res, next) => {
    const stall = await db['Stall'].findById(req.params.id);
  
    if (stall) {
      res.json({stall});
    } else {
      res.status(404).json({errors: ['Stall not found.']})
    }
  });

  return router;
}
