'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

describe('Test suite', function () {
    it('is undefined', function () {
        const foo = undefined;

        assert.isUndefined(foo);

        expect(foo).to.be.undefined;

        should.not.exist(foo);
    });

    it('is false', function () {
        const foo = false;

        assert.isFalse(foo);

        expect(foo).to.be.false;

        foo.should.be.false;
    });

    it('is null', function () {
        const foo = null;

        assert.isNull(foo);

        expect(foo).to.be.null;

        should.not.exist(foo);
    });
});
