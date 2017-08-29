require('babel-polyfill');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const db = require('./database/db');
const Boom = require('boom');
const Sequelize = require('sequelize');

const { injectJwtStrategy, authenticateJwt } = require('./security/jwt');

const authentication = require('./routes/authentication');
const canteens = require('./routes/canteens')(db);
const stalls = require('./routes/stalls')(db);
const users = require('./routes/users')(db);
const appointments = require('./routes/appointments')(db);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup security stuff
injectJwtStrategy(passport);
app.use(passport.initialize());

app.use('/authentication', authentication);
app.use('/canteens', canteens);
app.use('/stalls', stalls);
app.use('/users', authenticateJwt(passport), users);
app.use('/appointments', authenticateJwt(passport), appointments);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(Boom.notFound('No such path.'));
});

// Catch Sequelize error and forward to error handler
app.use((err, req, res, next) => {
  if (err instanceof db.Sequelize.EmptyResultError) {
    next(Boom.notFound('Record not found.'));
  } else if (err instanceof db.Sequelize.ConnectionError) {
    next(Boom.badGateway('Problems connecting to database.'));
  } else if (err instanceof db.Sequelize.DatabaseError) {
    next(Boom.badRequest('Request breaks database constraints.'));
  } else if (err instanceof db.Sequelize.ValidationError) {
    next(Boom.badRequest('Sequelize validation failed.'));
  } else if (err instanceof db.Sequelize.Error) {
    next(Boom.badGateway('Unknown Sequelize error.'));
  }
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    console.log(err.message);
    const internal_server_error = Boom.badImplementation();
    res.status(internal_server_error.output.statusCode).json(internal_server_error.output.payload);
  }
});

module.exports = app;
