'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const user = require('../models/user');

router.get('/', function (request, response) {
    console.log(user.getNamesList());

    response.sendFile(path.resolve('views/names.html'));
});

module.exports = router;
