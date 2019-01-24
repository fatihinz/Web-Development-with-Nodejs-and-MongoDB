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

        stub
            .onFirstCall().returns(1)
            .onSecondCall().returns(2)
            .onCall(3).returns(4)
        ;
        stub.returns(9);

        const firstCallResult = object.method();
        const secondCallResult = object.method();
        const thirdCallResult = object.method();
        const fourthCallResult = object.method();
        const fifthCallResult = object.method();

        firstCallResult.should.equal(1);
        secondCallResult.should.equal(2);
        thirdCallResult.should.equal(9);
        fourthCallResult.should.equal(4);
        fifthCallResult.should.equal(9);
    });
});
