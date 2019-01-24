'use strict';

const fs = require('fs');
const zlib = require('zlib');
const stream = fs.createReadStream('input.txt');
const gzip = zlib.createGzip();

stream.pipe(gzip).pipe(process.stdout);
