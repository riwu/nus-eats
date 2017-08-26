require('babel-polyfill');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var db = require('./database/db');

var injectJwtStrategy = require('./security/jwt');

var authentication = require('./routes/authentication');
var canteens = require('./routes/canteens')(db);
var stalls = require('./routes/stalls')(db);
var users = require('./routes/users')(db);
var appointments = require('./routes/appointments')(db);

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup security stuff
injectJwtStrategy(passport);
app.use(passport.initialize());

const authenticateMiddleware = passport.authenticate('jwt', { session: false });
app.use('/authentication', authentication);
app.use('/canteens', canteens);
app.use('/stalls', stalls);
app.use('/users', authenticateMiddleware, users);
app.use('/appointments', authenticateMiddleware, appointments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({errors: [ "Unknown error." ]});
});

module.exports = app;
