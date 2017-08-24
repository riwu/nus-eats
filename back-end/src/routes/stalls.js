const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id', async (req, res, next) => {
    const stall = await db['Stall'].findById(req.params.id, {
      attributes: {
        include: [[ db.sequelize.fn('AVG', db.sequelize.col('Ratings.value')), 'average_rating' ]]
      },
      include: [{
        model: db['Rating'],
        as: 'Ratings',
        attributes: []
      }],   
      group: ['Stall.id']
    });
  
    if (stall) {
      res.json({stall});
    } else {
      res.status(404).json({errors: ['Stall not found.']})
    }
  });

  return router;
}
