'use strict';

const fs = require('fs');
const stream = fs.createReadStream('lorem.txt', {highWaterMark: 44});

stream.setEncoding('utf8');

stream.on('data', function (chunk) {
    console.log('Read from file:', chunk);

    stream.pause();

    console.log('\t\t\tTaking a break');
    console.log('\t\t\t--------------');

    setTimeout(function () {
        console.log('Here is your data again');

        stream.resume();
    }, 1000);
});

stream.on('end', function () {
    console.log('Not reading anymore!');
});
