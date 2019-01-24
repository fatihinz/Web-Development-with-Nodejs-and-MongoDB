'use strict';

const express = require('express');
const app = express();
const router = express.Router();

// http://expressjs.com/4x/api.html#app.METHOD
app.route('/events')
    .get(function (request, response) {
        //
    })
    .post(function (request, response) {
        // http://expressjs.com/4x/api.html#app.post.method
    })
    .put(function (request, response) {
        // http://expressjs.com/4x/api.html#app.put.method
    })
    .delete(function (request, response) {
        // http://expressjs.com/4x/api.html#app.delete.method
    })
;

router.get('/events', function (request, response) {
    // http://expressjs.com/4x/api.html#router.METHOD
});
