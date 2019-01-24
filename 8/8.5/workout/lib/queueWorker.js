'use strict';

const config = require('../config/config');
const mongoose = require('mongoose');
const jobs = require('../config/queue');
const Event = require('../models/Event');
const _ = require('lodash');
const gracefulExit = require('./gracefulExit');

mongoose.connect(config.database);
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running');
    process.exit(1);
});

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

jobs.process('getEventRsvps', 1, function (job, done) {
    Event.findById(job.data.internalId, function (error, event) {
        if (error) {
            return done(error);
        }

        const total = 100;
        const completed = _.random(15, total);
        const forceFail = !!_.random(0, 1);

        if (forceFail) {
            done(new Error('Forcing the failure for display purposes'));
        }

        job.progress(completed, total);

        event.nativeApiGetEventRsvps(function (error, attendees) {
            if (error) {
                return done(error);
            }

            event.save(done);
        });
    });
});

console.log('Started queue worker');
