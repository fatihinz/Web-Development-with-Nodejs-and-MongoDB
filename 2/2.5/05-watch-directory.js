'use strict';

const fs = require('fs');

const watchOptions = {
    persistent: true,
    recursive: true
};

fs.watch('./temp', watchOptions, function (event, filename) {
    let message = 'Event "' + event + '" on "' + filename + '"';

    console.log(message);
});

console.log('Watching directory for changes');
