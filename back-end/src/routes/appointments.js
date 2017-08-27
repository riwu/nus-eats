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
  });

  router.patch('/:appointmentId', (req, res, next) => {
    db['Appointment']
    .findById(req.params.appointmentId)
    .then(appointment => {
      if (appointment.user_id == req.user.id) {
        res.send(403);
      }
  
      appointment.attendees.forEach(attendee => {
        if (attendee == req.user.id) {
          res.status(409);
        }
      });

      appointment.attendees.push(req.user.id);
      return appointment.update({attendees: appointment.attendees});
    }).then(appointment => {
      res.json({appointment});
    });
  });

  router.delete('/:appointmentId', (req, res, next) => {
    db['Appointment']
    .destroy({
      where: { id: req.params.appointmentId }
    })
    .then(response => {
      res.json({response});
    });
  });

  return router;
}