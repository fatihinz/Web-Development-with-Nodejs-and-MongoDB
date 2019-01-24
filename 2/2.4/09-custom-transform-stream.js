'use strict';

const Transform = require('stream').Transform;
const util = require('util');

util.inherits(EvenOdd, Transform);

function EvenOdd(options) {
    Transform.call(this, options);

    this.isEven = isEven;
};

function isEven(number) {
    return !(number % 2);
};

EvenOdd.prototype._transform = function (chunk, encoding, done) {
    let isEven = this.isEven(chunk);

    this.push(isEven ? 'Yes' : 'No');
    this.push('\n');

    done();
};

module.exports = EvenOdd;
