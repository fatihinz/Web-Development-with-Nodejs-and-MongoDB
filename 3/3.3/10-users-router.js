'use strict';

const express = require('express');
const router = express.Router();

router.use(function (request, response, next) {
    console.log('Middleware for this router');

    next();
});

router.get('/', function (request, response) {
    response.send('Users route');
});

module.exports = router;
