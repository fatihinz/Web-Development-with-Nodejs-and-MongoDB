'use strict';

const config = require('./config');
const kue = require('kue');
const jobs = kue.createQueue({
    redis: config.redis,
    jobEvents: false
});

jobs.on('error', function (error) {
    console.log('Queue error:', error);
});

module.exports = jobs;
