const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../utilities/async');
const removeElement = require('../utilities/array');
const Boom = require('boom');

module.exports = (db) => {

  router.post('/', asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].create({
      userId: req.user.id,
      startTime: req.body.appointment.startTime,
      endTime: req.body.appointment.endTime,
      canteenId: req.body.appointment.canteenId
    });
    res.status(201).json({appointment});
  }));

  router.post('/:appointmentId/join', asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].findById(req.params.appointmentId);

    if (!appointment) {
      throw Boom.notFound('Record not found.');
    }

    if (appointment.userId == req.user.id) {
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

  router.post('/:appointmentId/unjoin', asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].findById(req.params.appointmentId);

    if (!appointment) {
      throw Boom.notFound('Record not found.');
    }

    removeElement(appointment.attendees, req.user.id);
    await appointment.update({attendees: appointment.attendees});
    res.json({appointment});
  }));

  router.patch('/:appointmentId', asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].findById(req.params.appointmentId);

    if (!appointment) {
      throw Boom.notFound('Record not found.');
    }

    await appointment.update({
      startTime: req.body.appointment.startTime,
      endTime: req.body.appointment.endTime,
      canteenId: req.body.appointment.canteenId
    });
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