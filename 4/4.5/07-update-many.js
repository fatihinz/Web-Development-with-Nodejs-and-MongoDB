'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function (error, db) {
    assert.equal(null, error);

    console.log('Connected to MongoDB server');

    const filter = {};
    const update = {$set: {age: 29}};
    const options = {};
    const callback = function (error, results) {
        assert.equal(null, error);

        console.log('Number of modified documents: ' + results.modifiedCount);

        db.close();
    };

    db.collection('test').updateMany(filter, update, options, callback);
});
