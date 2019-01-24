'use strict';

const express = require('express');
const router = express.Router();
const passport = require('./../lib/passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

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

router.get('/mustache', function (request, response) {
    response.render('mustache', {
        name: 'Andrew',
        htmlString: 'This <strong>contains</strong> HTML tags',
        isLoggedIn: true,
        isAdmin: false,
        names: [
            'Andrew',
            'Cindy',
            'Brian'
        ],
        emptyList: [],
        user: {
            firstName: 'Andrew',
            lastName: 'Marcinkevičius',
            contacts: {
                twitter: 'ifdattic',
                email: 'andrew.web@ifdattic.com'
            }
        }
    });
});

module.exports = router;
