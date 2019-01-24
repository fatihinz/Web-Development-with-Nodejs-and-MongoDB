'use strict';

const should = require('chai').should();

describe('Test suite', function () {
    it('is a string', function () {
        'you'.should.be.a('string');
    });

    it('is an array', function () {
        'fail'.should.be.an('array');
    });

    it('is an object', function () {
        'fail'.should.be.an('object');
    });
});
