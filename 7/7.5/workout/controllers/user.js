'use strict';

const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.get('/profile', ensureLoggedIn(), function (request, response) {
    response.render('user/profile', {
        title: `${request.user.fullName}`
    });
});

module.exports = router;
