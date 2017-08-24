const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:id', async (req, res, next) => {
    const stall = await db['Stall'].findById(req.params.id, {
      attributes: {
        include: [[ db.sequelize.fn('AVG', db.sequelize.col('ratings.value')), 'average_rating' ]]
      },
      include: [{
        model: db['Rating'],
        as: 'ratings',
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
  
  router.get('/:id/ratings', async (req, res, next) => {
    const ratings = await db['Rating'].findAll({
      where: { stall_id: req.params.id },
      order: [
        [ 'updated_at', 'DESC' ]
      ]
    });
    res.json({ratings});
  });

  return router;
}
