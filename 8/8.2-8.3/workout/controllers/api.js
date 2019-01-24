'use strict';

const express = require('express');
const router = express.Router();
const Event = require('./../models/Event');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.route('/events/:id/feedbacks')
    .post(ensureLoggedIn(), function (request, response, next) {
        Event.findOne({_id: request.params.id}, function (error, event) {
            if (error || !event) {
                return response.status(404).json({
                    errors: [{
                        code: 'EVENT-NOT-FOUND',
                        status: 404,
                        title: 'Event not found',
                        details: 'Failed to find the event'
                    }]
                });
            }

            if (event.hasFeedback(request.user)) {
                return response.status(400).json({
                    errors: [{
                        code: 'EVENT-FEEDBACK-UPDATE-PUT',
                        status: 400,
                        title: 'Use PUT',
                        details: 'Use PUT method to update feedback'
                    }]
                });
            }

            const feedback = {
                well: request.body.well,
                better: request.body.better,
                volunteer: !!request.body.volunteer
            };

            event.addFeedback(feedback, request.user, function (error, event) {
                if (error) {
                    return response.status(400).json({
                        errors: [{
                            code: 'EVENT-FEEDBACK-FAIL-NEW',
                            status: 400,
                            title: 'Feedback failed',
                            details: 'Failed to leave feedback'
                        }]
                    });
                }

                request.flash('success', 'Feedback updated');

                response.status(201).json({
                    data: [
                        event
                    ]
                });
            });
        });
    })
    .put(ensureLoggedIn(), function (request, response, next) {
        Event.findOne({_id: request.params.id}, function (error, event) {
            if (error || !event) {
                return response.status(404).json({
                    errors: [{
                        code: 'EVENT-NOT-FOUND',
                        status: 404,
                        title: 'Event not found',
                        details: 'Failed to find the event'
                    }]
                });
            }

            if (!event.hasFeedback(request.user)) {
                return response.status(404).json({
                    errors: [{
                        code: 'EVENT-FEEDBACK-NOT-FOUND-UPDATE',
                        status: 404,
                        title: 'Feedback not found',
                        details: 'No feedback to update found'
                    }]
                });
            }

            const feedback = {
                well: request.body.well,
                better: request.body.better,
                volunteer: !!request.body.volunteer
            };

            event.addFeedback(feedback, request.user, function (error, event) {
                if (error) {
                    return response.status(400).json({
                        errors: [{
                            code: 'EVENT-FEEDBACK-FAIL-UPDATE',
                            status: 400,
                            title: 'Feedback failed',
                            details: 'Failed to update feedback'
                        }]
                    });
                }

                response.json({
                    data: [
                        event
                    ]
                });
            });
        });
    })
;

router.route('/events/:id')
    .delete(ensureLoggedIn(), function (request, response, next) {
        Event.findOne({_id: request.params.id}, function (error, event) {
            if (error || !event) {
                return response.status(404).json({
                    errors: [{
                        code: 'EVENT-NOT-FOUND',
                        status: 404,
                        title: 'Event not found',
                        details: 'Failed to find the event'
                    }]
                });
            }

            if (!event.hasFeedback(request.user)) {
                return response.status(404).json({
                    errors: [{
                        code: 'EVENT-FEEDBACK-NOT-FOUND-DELETE',
                        status: 404,
                        title: 'Feedback not found',
                        details: 'No feedback to delete found'
                    }]
                });
            }

            event.removeFeedback(request.user, function (error) {
                if (error) {
                    return response.status(400).json({
                        errors: [{
                            code: 'EVENT-FEEDBACK-FAIL-DELETE',
                            status: 400,
                            title: 'Feedback failed',
                            details: 'Failed to delete feedback'
                        }]
                    });
                }

                request.flash('success', 'Feedback deleted');

                response.status(204).end();

            });
        });
    })
;

router.route('/events')
    .get(ensureLoggedIn(), function (request, response, next) {
        Event.getEventsWithVolunteers(function (error, events) {
            if (error) {
                return response.status(400).json({
                    errors: [{
                        code: 'EVENT-WITH-VOLUNTEERS-FAILED',
                        status: 400,
                        title: 'Return events failed',
                        details: 'Failed to return return'
                    }]
                });
            }

            response.header('Cache-Control', 'max-age=3600');

            response.json({
                data: events
            });
        });
    })
;

module.exports = router;
