const babel = require('babel-polyfill');
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
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION
});
const { injectJwtStrategy, authenticateJwt } = require('./security/jwt');
const app = express();

const authentication = require('./routes/authentication')(db, s3);
const canteens = require('./routes/canteens')(db, s3);
const stalls = require('./routes/stalls')(db, s3);
const users = require('./routes/users')(db, s3);
const appointments = require('./routes/appointments')(db);
const photos = require('./routes/photos')(db, s3);

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
app.use('/appointments', appointments);
app.use('/photos', authenticateJwt(passport), photos);

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
    console.log(err.stack);
    const internal_server_error = Boom.badImplementation();
    res.status(internal_server_error.output.statusCode).json(internal_server_error.output.payload);
  }
});

module.exports = app;
