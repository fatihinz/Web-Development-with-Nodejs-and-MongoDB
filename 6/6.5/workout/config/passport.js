'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('./../models/User');

passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
