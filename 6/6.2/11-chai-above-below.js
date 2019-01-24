'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

describe('Test suite', function () {
    it('is above', function () {
        const foo = 6;

        assert.isAbove(foo, 3);

        expect(foo).to.be.above(3);

        foo.should.be.above(3);
    });

    it('is below', function () {
        const foo = 6;

        assert.isBelow(foo, 9);

        expect(foo).to.be.below(9);

        foo.should.be.below(9);
    });
});
