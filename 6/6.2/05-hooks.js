'use strict';

const should = require('chai').should();

describe('Test suite', function () {
    before(function () {
        console.log('Runs before all tests in this block');
    });

    after(function () {
        console.log('Runs after all tests in this block');
    });

    beforeEach(function () {
        console.log('Runs before each test in this block');
    });

    afterEach(function () {
        console.log('Runs after each test in this block');
    });

    it('is a string', function () {
        'you'.should.be.a('string');
    });

    it('is an array', function () {
        [].should.be.an('array');
    });

    it('is an object', function () {
        const object = {};

        object.should.be.an('object');
    });
});
