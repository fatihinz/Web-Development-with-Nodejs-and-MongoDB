'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

describe('Test suite', function () {
    const error = new ReferenceError('This is a bad function');
    const func = function () {
        throw error;
    }

    it('throws an error', function () {
        assert.throw(func, ReferenceError);

        expect(func).to.throw(ReferenceError);

        func.should.throw(ReferenceError);
    });

    it('does not throw an error', function () {
        assert.doesNotThrow(func, SyntaxError);

        expect(func).to.not.throw(SyntaxError);

        func.should.not.throw(SyntaxError);
    });
});
