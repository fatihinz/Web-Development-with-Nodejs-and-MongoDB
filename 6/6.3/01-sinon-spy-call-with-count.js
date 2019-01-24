'use strict';

const should = require('chai').should();
const sinon = require('sinon');

describe('Test Suite', function () {
    it('spies on the object', function () {
        const object = {
            method: function (arg) {
                return arg;
            }
        };
        const spy = sinon.spy(object, 'method');

        object.method(1);
        object.method(42);
        object.method(1);

        spy.callCount.should.equal(3);

        spy.withArgs(1).calledTwice.should.be.true;
        spy.withArgs(42).calledOnce.should.be.true;

        spy.neverCalledWith(3).should.be.true;
    });
});
