'use strict';

const express = require('express');
const router = express.Router();
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

module.exports = router;
