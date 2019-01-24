'use strict';

const fs = require('fs');
const stream = fs.createReadStream('input.txt');

stream.on('readable', function () {
    let chunk;

    while (null != (chunk = stream.read(9))) {
        console.log('Read from file:', chunk);
    }
});

stream.on('end', function () {
    console.log('Not reading anymore!');
});
