'use strict';

const fs = require('fs');

fs.open('./temp/output.txt', 'a', function (error, fd) {
    if (error) {
        throw error;
    }

    let currentTime = new Date().toISOString() + '\n';

    fs.write(fd, currentTime, function (error, written, string) {
        if (error) {
            throw error;
        }

        console.log('Bytes written:', written);
        console.log('Written to file:', string);

        fs.close(fd, function () {
            console.log('Done writing to file');
        });
    });
});
