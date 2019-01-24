'use strict';

const fs = require('fs');
const helloString = require('./02-hello-string');
const helloFunction = require('./03-hello-function');
const helloObject = require('./04-hello-object');
const name = require('./04-hello-object').name;

console.log(helloString);

helloFunction();

helloObject.say('Andrew');

console.log(name);
