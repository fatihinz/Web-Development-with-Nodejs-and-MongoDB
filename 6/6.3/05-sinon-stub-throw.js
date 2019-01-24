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
        const CustomError = {message: 'Custom message'};
        const stub = sinon.stub(object, 'method');

        stub.withArgs(1).returns(3);
        stub.withArgs(42).throws(CustomError);

        object.method(1).should.equal(3);

        should.Throw(function () { object.method(42); }, CustomError);
    });
});
