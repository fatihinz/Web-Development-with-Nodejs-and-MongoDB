'use strict';

const fs = require('fs');
const should = require('chai').should();

describe('Test suite', function () {
    it('reads file contents synchronously', function () {
        const contents = fs.readFileSync('file.txt', {encoding: 'utf8'});

        contents.should.be.a('string');
        contents.should.equal('Contents from file');
    });
});
