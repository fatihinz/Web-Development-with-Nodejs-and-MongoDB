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
        event.nativeApiGetEventRsvps(function (error, attendees) {
        // event.clientApiGetEventRsvps(function (error, attendees) {
            if (!error) {
                event.attendees = attendees;
            }

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
};

module.exports = mongoose.model('Event', eventSchema);
