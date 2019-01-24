'use strict';

const EvenOdd = require('./09-custom-transform-stream');
const evenOdd = new EvenOdd();

process.stdin
    .pipe(evenOdd)
    .pipe(process.stdout);
