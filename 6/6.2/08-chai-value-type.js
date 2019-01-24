'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

describe('Test suite', function () {
    it('is an object', function () {
        const foo = {foo: 'bar'};

        assert.isObject(foo);

        expect(foo).to.be.an('object');

        foo.should.be.an('object');
    });

    it('is an array', function () {
        const foo = [1, 2, 3];

        assert.isArray(foo, 'Custom message');

        expect(foo).to.be.an('array', 'Custom message');

        foo.should.be.an('array', 'Custom message');


        assert.isArray('fail', 'Failing to display custom message');
    });

    it('is a string', function () {
        const foo = 'bar';

        assert.isString(foo);

        expect(foo).to.be.a('string');

        foo.should.be.a('string');
    });

    it('is not a string', function () {
        const foo = ['bar'];

        assert.isNotString(foo);

        expect(foo).to.not.be.a('string');

        foo.should.not.be.a('string');
    });
});
