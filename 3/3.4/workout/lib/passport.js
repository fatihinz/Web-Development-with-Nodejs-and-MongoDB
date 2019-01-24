'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./../db');

passport.use(new Strategy(
    function (username, password, done) {
        db.users.findByUsername(username, function (error, user) {
            if (error) {
                return done(error);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false, { message: 'Invalid credentials' });
            }

            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.users.findById(id, function (error, user) {
        if (error) {
            return done(error);
        }

        done(null, user);
    });
});

module.exports = passport;
