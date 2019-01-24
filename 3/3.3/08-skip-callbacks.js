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

app.get('/about', function (request, response) {
    response.send('About page');
});

app.get('/bo+o', function (request, response) {
    response.send('Boo page');
});

app.get(/.*ula$/, function (request, response) {
    response.send('Bla bla bla');
});

app.get('/multiple', function (request, response, next) {
    response.user = 'Andrew';

    next();
}, function (request, response) {
    response.send('Hello ' + response.user);
});

app.get('/skip', function (request, response, next) {
    console.log('Will skip the rest');

    next('route');
}, function (request, response) {
    response.send('Never called');
});

app.listen(3000);

console.log('Open: http://127.0.0.1:3000/');
