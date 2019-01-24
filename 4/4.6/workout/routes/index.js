'use strict';

const express = require('express');
const router = express.Router();
const passport = require('./../config/passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const User = require('./../models/User');

/* GET home page. */
router.get('/', function(request, response, next) {
    response.render('index', { title: 'Express' });
});

router.route('/login')
    .get(function (request, response) {
        response.render('login', { error: request.flash('error')});
    })
    .post(passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))
;

router.get('/logout', function (request, response) {
    request.logout();

    response.redirect('/');
});

router.get('/profile', ensureLoggedIn(), function (request, response) {
    response.send('Hello ' + request.user.username);
});

router.post('/register', function (request, response) {
    const user = {
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName
    };

    User.register(new User(user), request.body.password, function (error, user) {
        if (error) {
            let message = error.message + '\n';

            if (error && error.errors && error.errors.firstName) {
                message += error.errors.firstName.message;
            }

            return response.send(message);
        }

        response.send('User "' + user.fullName + '" registered');
    });
});

router.post('/hello', function (request, response, next) {
    const id = request.body.id;

    User.findById(id, function (error, user) {
        if (error) {
            return next(error);
        }

        if (!user) {
            return response.send(`User ${id} not found`);
        }

        response.send(user.sayHello());
    });
});

router.post('/static-method', function (request, response) {
    const name = request.body.name

    User.findByName(name, function (error, users) {
        response.json({'users': users});
    });
});

router.post('/static-method-safe', function (request, response, next) {
    const name = request.body.name

    User.findByNameSafe(name, function (error, users) {
        if (error) {
            return next(error);
        }

        response.json({'users': users});
    });
});

router.post('/update', function (request, response, next) {
    const id = request.body.id;

    User.findById(id, function (error, user) {
        if (error) {
            return next(error);
        }

        if (!user) {
            return response.send(`User ${id} not found`);
        }

        user.age -= 3;

        user.save(function (error) {
            if (error) {
                return next(error);
            }

            response.send(user);
        });
    });
});

router.post('/update2', function (request, response, next) {
    const id = request.body.id;

    const conditions = {_id: id};
    const changes = {$set: {age: 28}};
    const options = {runValidators: true};

    User.update(conditions, changes, options, function (error, raw) {
        if (error) {
            return next(error);
        }

        response.send('Updated');
    });
});

router.post('/update3', function (request, response, next) {
    const id = request.body.id;

    const changes = {$unset: {firstName: true}, $set: {age: 44}};

    User.findByIdAndUpdate(id, changes, function (error, user) {
        if (error) {
            return next(error);
        }

        response.send(user);
    });
});

module.exports = router;
