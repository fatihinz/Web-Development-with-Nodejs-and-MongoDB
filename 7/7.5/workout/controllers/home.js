'use strict';

const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const Event = require('./../models/Event');

router.get('/', function (request, response, next) {
    Event.getEvents(function (error, events) {
        if (error) {
            return next(error);
        }

        response.render('index', {
            title: 'FeedbackW',
            events: events
        });
    });
});

router.get('/dashboard', ensureLoggedIn(), function (request, response, next) {
    if ('admin' !== request.user.role) {
        return next(new Error('You are not authorized to view this page'));
    }

    response.render('dashboard', {
        title: 'Dashboard'
    });
});

module.exports = router;
