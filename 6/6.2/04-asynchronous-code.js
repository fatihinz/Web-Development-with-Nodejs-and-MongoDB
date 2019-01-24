'use strict';

const fs = require('fs');
const should = require('chai').should();

describe('Test suite', function () {
    it('reads file contents synchronously', function () {
        const contents = fs.readFileSync('file.txt', {encoding: 'utf8'});

        contents.should.be.a('string');
        contents.should.equal('Contents from file');
    });

    it('reads file contents asynchronously', function (done) {
        fs.readFile('file.txt', {encoding: 'utf8'}, function (error, data) {
            if (error) {
                throw error;
            }

            done();
        });
    });

    it('reads file contents asynchronously alternative', function (done) {
        fs.readFile('file.txt', {encoding: 'utf8'}, done);
    });
});
