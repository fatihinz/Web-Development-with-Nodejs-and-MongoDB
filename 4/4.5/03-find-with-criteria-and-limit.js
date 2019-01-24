'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function (error, db) {
    assert.equal(null, error);

    console.log('Connected to MongoDB server');

    const restaurants = db.collection('restaurants');

    restaurants.find({cuisine: 'Thai'}).limit(5).toArray(function (error, documents) {
        assert.equal(null, error);

        console.log(documents);

        db.close();
    });
});
