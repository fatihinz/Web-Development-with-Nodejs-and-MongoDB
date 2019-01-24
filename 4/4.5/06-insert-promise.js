'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function (error, db) {
    assert.equal(null, error);

    console.log('Connected to MongoDB server');

    const person = {name: 'Cindy', age: 32};

    db.collection('test').insertOne(person)
        .then(function (results) {
            console.log('Document inserted: ' + results.insertedId);
        })
        .catch(function (reason) {
            console.log('Failed to insert: ' + reason.message);
        })
        .then(function (results) {
            db.close();
        })
    ;
});
