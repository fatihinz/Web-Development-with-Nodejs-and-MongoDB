'use strict';

const should = require('chai').should();
const sinon = require('sinon');

describe('Test Suite', function () {
    it('stubs the object', function () {
        const object = {
            method: function (arg) {
                return arg;
            }
        };
        const stub = sinon.stub(object, 'method');

        stub.withArgs(1).returns(3);
        stub.returns(55);

        const firstCallResult = object.method(1);
        const secondCallResult = object.method(7);

        firstCallResult.should.equal(3);
        secondCallResult.should.equal(55);
    });
});
