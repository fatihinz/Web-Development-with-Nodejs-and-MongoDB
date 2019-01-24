'use strict';

const express = require('express');
const app = express();

app.all('/', function (request, response, next) {
    console.log('Executed an all (' + request.method + ') methods');

    next();
});

app.get('/', function (request, response) {
    response.send('Hello World');
});

app.post('/', function (require, response) {
    response.send('Responding to POST method');
});

app.listen(3000);

console.log('Open: http://127.0.0.1:3000/');
