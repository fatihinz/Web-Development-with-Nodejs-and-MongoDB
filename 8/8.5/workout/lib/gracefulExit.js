'use strict';

const mongoose = require('mongoose');
const jobs = require('../config/queue');
const async = require('async');

module.exports = function () {
    const tasks = [
        function (callback) {
            mongoose.connection.close(function () {
                console.log('Mongoose connection closed');

                callback();
            });
        },
        function (callback) {
            jobs.shutdown(5000, function (error) {
                console.log('Kue shutdown:', error || 'success');

                callback();
            });
        }
    ];

    async.parallel(tasks, function () {
        console.log('All exit tasks completed');

        process.exit(0);
    });
};
