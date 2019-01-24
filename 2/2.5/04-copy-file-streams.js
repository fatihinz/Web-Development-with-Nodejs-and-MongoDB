'use strict';

const fs = require('fs');
const readStream = fs.createReadStream('config.json');
const writeStream = fs.createWriteStream('temp/copy.json');

readStream.pipe(writeStream);

console.log('Finished copying the file');
