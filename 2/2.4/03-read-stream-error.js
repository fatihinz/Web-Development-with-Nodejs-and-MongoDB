'use strict';

const fs = require('fs');
const stream = fs.createReadStream('non existing file');

stream.on('error', function () {
    console.log('no file, no work :P');
});
