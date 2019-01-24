'use strict';

const should = require('chai').should();
const Event = require('./../../models/Event');

const mongoose = require('mongoose');

describe('Event model', function () {
    const eventsCollectionName = Event.collection.collectionName;

    before(function (done) {
        // Re-use the connection
        // if (mongoose.connection.db) {
        //     return done();
        // }

        // OR

        mongoose.disconnect();
        mongoose.connect('mongodb://localhost:27017/feedbacktest', function (error) {
            done(error);
        });
    });

    after(function (done) {
        mongoose.connection.close();

        done();
    });

    beforeEach(function (done) {
        mongoose.connection.db.dropCollection(eventsCollectionName, function (error, results) {
            if (error && 'ns not found' != error.errmsg) {
                return done(error);
            }

            const event = new Event({
                name: 'Test event'
            });

            event.save(done);
        });
    });

    it('should find event by name', function (done) {
        Event.findOne({name: 'Test event'}, function (error, event) {
            if (error) {
                return done(error);
            }

            should.exist(event);
            event.name.should.equal('Test event');

            done();
        });
    });
});
