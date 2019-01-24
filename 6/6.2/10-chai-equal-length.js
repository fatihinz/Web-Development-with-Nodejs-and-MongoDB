'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

describe('Test suite', function () {
    it('is strict equal', function () {
        const foo = 'bar';

        assert.strictEqual(foo, 'bar');
        assert.lengthOf(foo, 3);

        expect(foo).to.equal('bar');
        expect(foo).to.have.length(3);

        foo.should.be.equal('bar');
        foo.should.have.length(3);
    });
});
