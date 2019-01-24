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

        const secondCall = spy.getCall(1);
        const secondCallFirstArgument = spy.secondCall.args[0];

        secondCall.returned(42).should.be.true;

        console.log('Arguments:', spy.secondCall.args);
        console.log('Return values:', spy.returnValues);
    });
});
