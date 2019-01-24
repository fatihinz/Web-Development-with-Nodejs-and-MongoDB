'use strict';

const should = require('chai').should();
const sinon = require('sinon');
const Event = require('./../../models/Event');

describe('Event model - Mocked', function () {
    let sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should find event by name', function (done) {
        const mock = sandbox.mock(Event);
        mock.expects('findOne')
            .withArgs({name: 'Test event'})
            .once()
            .yields(null, new Event({name: 'Test event'}))
        ;

        Event.findOne({name: 'Test event'}, function (error, event) {
            if (error) {
                return done(error);
            }

            should.exist(event);
            event.name.should.equal('Test event');

            mock.verify();

            done();
        });
    });
});
