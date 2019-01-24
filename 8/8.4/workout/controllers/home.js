'use strict';

const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const Event = require('./../models/Event');

require('node-jsx').install();

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = React.createFactory(require('../public/js/components/app'));

router.get('/', function (request, response, next) {
    Event.getEvents(function (error, events) {
        if (error) {
            return next(error);
        }

        response.render('index', {
            title: 'FeedbackW',
            events: events,
            react: ReactDOMServer.renderToString(App())
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
