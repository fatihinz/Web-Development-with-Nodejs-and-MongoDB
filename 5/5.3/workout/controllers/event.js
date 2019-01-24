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

module.exports = router;
