const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../utilities/async');
const Boom = require('boom');

module.exports = (db) => {

  router.post('/', asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].create({
      user_id: req.user.id,
      start_time: req.body.appointment.start_time,
      end_time: req.body.appointment.end_time,
      canteen_id: req.body.appointment.canteen_id
    });
    res.status(201).json({appointment});
  }));

  router.patch('/:appointmentId', asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].findById(req.params.appointmentId);

    if (!appointment) {
      throw Boom.notFound('Record not found.');
    }

    if (appointment.user_id == req.user.id) {
      throw Boom.forbidden('Host cannot join his/her own appointment.');
    }

    appointment.attendees.forEach(attendee => {
      if (attendee == req.user.id) {
        throw Boom.forbidden('User has already joined appointment.');
      }
    });

    appointment.attendees.push(req.user.id);
    await appointment.update({attendees: appointment.attendees});
    res.json({appointment});
  }));

  router.delete('/:appointmentId', asyncMiddleware(async (req, res, next) => {
    const result = await db['appointment'].destroy({
      where: { id: req.params.appointmentId }
    });
    if (result == 0) {
      throw Boom.notFound('Record not found.');
    } else {
      res.status(204).send();
    }
  }));

  return router;
}