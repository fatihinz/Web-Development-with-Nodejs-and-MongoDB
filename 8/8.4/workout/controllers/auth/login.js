'use strict';

function login(request, response) {
    response.render('auth/login', { title: 'Login' });
};

module.exports = login;
