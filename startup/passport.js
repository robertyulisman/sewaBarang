const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    passport = require('passport'),
    TransportUser = require('simpfleet_models/models/TransportUser'),
    LogisticUser = require('simpfleet_models/models/LogisticsUser'),
    keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.SECRET;

module.exports = () => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            if (jwt_payload.userType.toLowerCase() === 'driver') {
                TransportUser.findById(jwt_payload.id)
                    .then((user) => {
                        if (user) {
                            return done(null, user);
                        }
                        return done(null, false);
                    })
                    .catch((err) => console.log(err));
            } else if (jwt_payload.userType.toLowerCase() === 'logistics') {
                LogisticUser.findById(jwt_payload.id)
                    .then((user) => {
                        if (user) {
                            return done(null, user);
                        }
                        return done(null, false);
                    })
                    .catch((err) => console.log(err));
            }
        }),
    );
};
