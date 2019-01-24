'use strict';

const express = require('express');
const app = express();

const users = require('./controllers/users');

app.get('/', function (request, response) {
    response.send('Hello World');
});

app.use('/users', users);

app.listen(3000);

console.log('Open: http://127.0.0.1:3000/');
