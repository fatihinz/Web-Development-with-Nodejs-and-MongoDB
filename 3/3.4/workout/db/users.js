'use strict';

const records = [
    { id: 1, username: 'Andrew', password: 'secret', role: 'admin' },
    { id: 2, username: 'Cindy', password: 'forgot', role: 'user' }
];

exports.findById = function (id, callback) {
    process.nextTick(function () {
        const idx = id - 1;

        if (records[idx] && id == records[idx].id) {
            callback(null, records[idx]);
        } else {
            callback(new Error('User ' + id + ' does not exist'));
        }
    });
}

exports.findByUsername = function (username, callback) {
    process.nextTick(function () {
        for (let i = 0, length = records.length; i < length; i++) {
            let record = records[i];

            if (username === record.username) {
                return callback(null, record);
            }
        }

        return callback(null, null);
    });
}
