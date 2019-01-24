'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function (error, db) {
    assert.equal(null, error);

    console.log('Connected to MongoDB server');

    const restaurants = db.collection('restaurants');

    const cursor = restaurants.find({cuisine: 'Thai'}).limit(5);

    cursor.forEach(function (restaurant) {
        console.log('Restaurant: ' + restaurant.name);
    }, function (error) {
        assert.equal(null, error);

        console.log('Done reading from cursor');

        db.close();
    });
});
