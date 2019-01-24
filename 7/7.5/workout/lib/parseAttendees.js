'use strict';

const _ = require('lodash');

// Example of arrow function
// module.exports = function (data, callback) {
module.exports = (data, callback) => {
    let parsedData = data;

    if ('string' === typeof data) {
        parsedData = _.attempt(JSON.parse.bind(null, data));

        if (_.isError(parsedData)) {
            return callback(parsedData);
        }
    }

    const attendees = [];

    for (let i = 0, length = parsedData.results.length; i < length; i++) {
        let attendee = parsedData.results[i];

        attendees.push(attendee.member.name);
    }

    return callback(null, attendees);
};
