const express = require('express');
const router = express.Router();
const request = require('request-promise');

module.exports = (db) => {
  router.post('/', (req, res, next) => {
    db['Appointment']
    .create({
      user_id: req.user.id,
      start_time: req.body.appointment.start_time,
      end_time: req.body.appointment.end_time,
      canteen_id: req.body.appointment.canteen_id
    })
    .then(appointment => res.status(201).json({appointment}));
  })

  return router;
}