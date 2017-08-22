const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

function injectJwtStrategy(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  const strategy = new JwtStrategy(opts, (payload, done) => {
    done(null, payload.user);
  });

  passport.use(strategy);
}

module.exports = injectJwtStrategy;
