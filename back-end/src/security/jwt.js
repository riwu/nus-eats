const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const Boom = require('boom');

let injectJwtStrategy = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  const strategy = new JwtStrategy(opts, (payload, done) => {
    done(null, payload.user);
  });

  passport.use(strategy);
};

let authenticateJwt = (passport) => {
  return (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return next(Boom.unauthorized()); }
      req.user = user;
      return next();
    })(req, res, next);
  };
};

module.exports = { injectJwtStrategy, authenticateJwt };
