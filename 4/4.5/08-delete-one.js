'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function (error, db) {
    assert.equal(null, error);

    console.log('Connected to MongoDB server');

    const restaurants = db.collection('restaurants');

    restaurants.deleteOne({cuisine: 'Thai'}, function (error, result) {
        assert.equal(null, error);

        console.log('Number of documents deleted: ' +  result.deletedCount);

        db.close();
    });
});
