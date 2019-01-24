'use strict';

const should = require('chai').should();
const sinon = require('sinon');

describe('Test Suite', function () {
    const object = {
        method: function (arg) {
            return arg;
        }
    };

    it('mocks the object to fail', function () {
        const mock = sinon.mock(object);

        mock.expects('method').once();

        mock.verify();
    });

    it('mocks the object to succeed', function () {
        const mock = sinon.mock(object);

        mock.expects('method').once();

        object.method();

        mock.verify();
    });
});
