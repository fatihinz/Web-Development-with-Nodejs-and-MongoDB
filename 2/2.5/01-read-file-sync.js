'use strict';

const fs = require('fs');

const config = fs.readFileSync('./config.json', 'utf8');

console.log(config);

console.log('The configuration is loaded, please proceed');
