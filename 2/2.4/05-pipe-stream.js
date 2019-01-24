'use strict';

const fs = require('fs');
const stream = fs.createReadStream('input.txt');

stream.pipe(process.stdout);
