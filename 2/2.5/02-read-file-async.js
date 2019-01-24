'use strict';

const fs = require('fs');

fs.readFile('./config.json', 'utf8', function (error, data) {
    console.log(data);

    console.log('The configuration is loaded, please proceed');
});

console.log('Proceed after the configuration file will be loaded');
