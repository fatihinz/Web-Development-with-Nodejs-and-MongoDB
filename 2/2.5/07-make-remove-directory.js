'use strict';

const fs = require('fs');
const path = './temp/dir-from-script';

fs.mkdir(path, function (error) {
    if (error) {
        throw error;
    }

    console.log('Directory created');
});

fs.rmdir('non-existing', function (error) {
    if (error) {
        console.log('Directory does not exist');
    } else {
        console.log('Directory removed');
    }
});
