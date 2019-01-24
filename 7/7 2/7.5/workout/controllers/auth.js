'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./../models/User');

const login = require('./auth/login');

router.route('/login')
    .get(login)
    .post(passport.authenticate('local', {
        successRedirect: '/users/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))
;

router.get('/logout', function (request, response) {
    request.logout();

    response.redirect('/login');
});

router.post('/register', function (request, response) {
    const user = {
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        age: request.body.age,
        role: 'user'
    };

    User.register(new User(user), request.body.password, function (error, user) {
        if (error) {
            let message = error.message + '\n';

            return response.send(message);
        }

        response.send('User "' + user.fullName + '" registered');
    });
});

module.exports = router;
