'use strict';

const express = require('express');
const router = express.Router();
const Event = require('./../models/Event');
const config = require('./../config/config');

router.get('/scrape', function (request, response, next) {
    if (request.query.token !== config.token) {
        return response.status(400).send('Bad Request');
    }

    Event.apiGetPastEvents(function (error, events) {
        if (error) {
            return next(error);
        }

        Event.saveEvents(events.results, function (error) {
            if (error) {
                return next(error);
            }

            response.send('Scrape completed');
        });
    });
});

router.route('/:id')
    .get(function (request, response, next) {
        Event.findOne({_id: request.params.id}, function (error, event) {
            if (error) {
                return next(error);
            }

            response.render('event/index', {
                title: event.name,
                event: event,
                hasFeedback: event.hasFeedback(request.user),
                userFeedback: event.findUserFeedback(request.user, true)
            });
        });
    })
;

module.exports = router;
