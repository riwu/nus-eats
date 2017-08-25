const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/:userId/appointments', async (req, res, next) => {
      var appointments = await db['Appointment'].findAll({
        where: { user_id: req.params.userId }
      });
      return res.json({appointments});
    });
    
    return router;
};