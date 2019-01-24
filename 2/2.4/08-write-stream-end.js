'use strict';

const fs = require('fs');
const stream = fs.createWriteStream('output.txt');

stream.write('Hello ');
stream.write('world');

stream.end('The end');

stream.on('finish', function () {
    console.log('Finished writing to stream');
});

stream.on('error', function (error) {
    console.log('Did you try to write after calling end() method?');
    console.log(error.stack);
});

stream.write('Not allowed to write after the end()');
