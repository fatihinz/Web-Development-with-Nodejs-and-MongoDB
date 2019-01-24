'use strict';

const should = require('chai').should();
const sinon = require('sinon');

describe('Test Suite', function () {
    let clock;

    before(function () {
        clock = sinon.useFakeTimers();
    });

    it('fakes the timer', function () {
        const timed = function () {
            setTimeout(function () { called = true; }, 1000);
        };
        let called = false;

        called.should.be.false;

        timed();

        called.should.be.false;

        clock.tick(999);

        called.should.be.false;

        clock.tick(1);

        called.should.be.true;
    });

    after(function () {
        clock.restore();
    });
});
