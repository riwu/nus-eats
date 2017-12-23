const express = require('express');
const Boom = require('boom');
const passport = require('passport');
const asyncMiddleware = require('../utilities/async');
const removeElement = require('../utilities/array');
const { authenticateJwt } = require('../security/jwt');

const router = express.Router();

module.exports = (db) => {

  router.get('/:appointmentId', asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].findById(req.params.appointmentId);

    if (!appointment) {
      throw Boom.notFound('Record not found.');
    }

    res.json({appointment});
  }));

  router.post('/', authenticateJwt(passport), asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].create({
      userId: req.user.id,
      startTime: req.body.appointment.startTime,
      endTime: req.body.appointment.endTime,
      canteenId: req.body.appointment.canteenId,
      title: req.body.appointment.title,
      description: req.body.appointment.description
    });
    res.status(201).json({appointment});
  }));

  router.post('/:appointmentId/join', authenticateJwt(passport), asyncMiddleware(async (req, res, next) => {
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

  router.post('/:appointmentId/unjoin',authenticateJwt(passport),  asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].findById(req.params.appointmentId);

    if (!appointment) {
      throw Boom.notFound('Record not found.');
    }

    removeElement(appointment.attendees, req.user.id);
    await appointment.update({attendees: appointment.attendees});
    res.json({appointment});
  }));

  router.patch('/:appointmentId', authenticateJwt(passport), asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].findById(req.params.appointmentId);

    if (!appointment) {
      throw Boom.notFound('Record not found.');
    }

    if (appointment.userId != req.user.id) {
      throw Boom.forbidden('Only appointment creator can edit the appointment.');
    }

    await appointment.update({
      startTime: req.body.appointment.startTime,
      endTime: req.body.appointment.endTime,
      canteenId: req.body.appointment.canteenId,
      title: req.body.appointment.title,
      description: req.body.appointment.description
    });
    res.json({appointment});
  }));

  router.delete('/:appointmentId', authenticateJwt(passport), asyncMiddleware(async (req, res, next) => {
    const appointment = await db['appointment'].findById(req.params.appointmentId);

    if (!appointment) {
      throw Boom.notFound('Record not found.');
    }

    if (appointment.userId != req.user.id) {
      throw Boom.forbidden('Only appointment creator can delete the appointment.');
    }

    await appointment.destroy();
    res.status(204).send();
  }));

  return router;
}