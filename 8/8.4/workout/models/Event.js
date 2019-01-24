'use strict';

const async = require('async');
const config = require('./../config/config');
const Feedback = require('./Feedback');
const https = require('https');
const meetup = require('meetup-api')({key: config.meetupKey});
const mongoose = require('mongoose');
const _ = require('lodash');
const Client = require('node-rest-client').Client;
const parseAttendees = require('./../lib/parseAttendees');
const jobs = require('../config/queue');

const client = new Client();

const eventSchema = new mongoose.Schema({
    name: { type: String, required: 'Event name is required' },
    externalId: String,
    time: Date,
    url: String,
    venue: {
        name: String,
        city: String
    },
    attendeeCount: Number,
    attendees: [String],
    feedback: [Feedback.schema]
});

eventSchema.set('toJSON', {
    transform: function (document, ret, options) {
            return {
                id: document._id,
                name: document.name,
                external_id: document.externalId,
                feedback: document.feedback
            };
    }
});

eventSchema.statics.getEvents = function (callback) {
    return this.find({}).limit(25).exec(callback);
};

eventSchema.statics.apiGetPastEvents = function (callback) {
    const options = {
        category: 9,
        status: 'past',
        page: config.eventsPerPage,
        desc: true,
        only: 'event_url,yes_rsvp_count,name,id,time,venue.city,venue.name'
        // HOMEWORK: Retrieve events from last scrape ('time')
    };

    meetup.getOpenEvents(options, function (error, events) {
        callback(error, events);
    });
};

eventSchema.statics.saveEvents = function (events, callback) {
    const newEvents = [];

    for (let i = 0, length = events.length; i < length; i++) {
        let event = events[i];
        let eventDocument = new this({
            name: event.name,
            externalId: event.id,
            time: event.time,
            url: event.event_url,
            attendeeCount: event.yes_rsvp_count,
            attendees: []
        });

        if (event.venue) {
            eventDocument.venue = {
                name: event.venue.name,
                city: event.venue.city
            };
        }

        newEvents.push(eventDocument);
    }

    async.eachSeries(newEvents, function (event, asyncCallback) {
        let jobData = {
            title: 'Get attendees for "' + event.externalId + '" event',
            externalId: event.externalId,
            internalId: event.id
        };

        let job = jobs.create('getEventRsvps', jobData)
            .priority('low')
            .priority(5)
            .attempts(3)
            .backoff({type: 'exponential'})
            .ttl(5000)
            .delay(3000)
            .save(function (error) {
                if (error) {
                    console.log('Failed to save job', job.id);
                }

                job.log('Job added for "%s" event', event.name);

                event.save(asyncCallback);
            });
    }, callback);
};

eventSchema.methods.nativeApiGetEventRsvps = function (callback) {
    const options = {
        hostname: 'api.meetup.com',
        port: 443,
        path: '/2/rsvps?' +
            'key=' + config.meetupKey +
            '&event_id=' + this.externalId +
            '&rsvp=yes' +
            '&page=100' +
            // HOMEWORK: Add pagination
            '&only=member,response',
        method: 'GET'
    };

    const request = https.request(options, function (response) {
        if (200 !== response.statusCode) {
            return callback(new Error('Failed to retrieve attendees'));
        }

        let data = '';

        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            return parseAttendees(data, callback);
        });
    });

    request.on('error', function (error) {
        return callback(new Error('Failed to retrieve attendees'));
    });

    request.end();
};

eventSchema.methods.clientApiGetEventRsvps = function (callback) {
    const args = {
        parameters: {
            key: config.meetupKey,
            event_id: this.externalId,
            rsvp: 'yes',
            page: 100,
            only: 'member,response'
        }
    };

    client.registerMethod('getEventRsvps', 'https://api.meetup.com/2/rsvps', 'GET');

    client.methods.getEventRsvps(args, function (data, response) {
        if (200 !== response.statusCode) {
            return callback(new Error('Failed to retrieve attendees'));
        }

        return parseAttendees(data, callback);
    }).on('error', function (error) {
        return callback(new Error('Failed to retrieve attendees'));
    });
}

eventSchema.methods.findUserFeedback = function (user, single) {
    const inFeedback = function (feedback) {
        return feedback.attendee == user.id;
    };

    const feedbacks = this.feedback.filter(inFeedback);

    if (single) {
        if (!feedbacks.length) {
            return null;
        }

        return feedbacks[0];
    }

    return feedbacks;
}

eventSchema.methods.hasFeedback = function (user) {
    if (!user) {
        return false;
    }

    const feedbacks = this.findUserFeedback(user);

    return !!feedbacks.length;
};

eventSchema.methods.removeUserFeedbacks = function (user) {
    const isUserFeedback = function (feedback) {
        return feedback.attendee != user.id;
    }

    return this.feedback.filter(isUserFeedback);
}

eventSchema.methods.addFeedback = function (feedbackData, user, callback) {
    const feedbacks = this.findUserFeedback(user);
    const feedback = new Feedback({attendee: user});

    this.feedback = this.removeUserFeedbacks(user);

    feedback.answers = feedbackData;

    this.feedback.push(feedback);

    this.save(callback);
};

eventSchema.methods.removeFeedback = function (user, callback) {
    this.feedback = this.removeUserFeedbacks(user);

    this.save(callback);
}

eventSchema.statics.getEventsWithVolunteers = function (callback) {
    const pipeline = [
        {$unwind: '$feedback'},
        {$match: {
            'feedback.answers.volunteer': true
        }},
        {$project: {
            name: 1
        }},
        {$group: {
            _id: {
                id: '$_id',
                name: '$name'
            },
            volunteers: {$sum: 1}
        }},
        {$sort: {
            volunteers: -1
        }},
        {$project: {
            _id: 0,
            id: '$_id.id',
            name: '$_id.name',
            volunteers: '$volunteers'
        }}
    ];

    this.aggregate(pipeline, function (error, result) {
        return callback(error, result);
    });
};

module.exports = mongoose.model('Event', eventSchema);
