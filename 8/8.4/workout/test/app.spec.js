'use strict';

const request = require('supertest');
const app = require('../app.js');

describe('App', function () {
    describe('GET /login', function () {
        it('should return 200 OK', function (done) {
            request(app)
                .get('/login')
                .expect(200, done)
            ;
        });
    });

    describe('GET /non-existing', function () {
        it('should return 404', function (done) {
            request(app)
                .get('/non-existing')
                .expect(404, done)
            ;
        });
    });

    describe('POST /api/events/:id/feedbacks', function () {
        it('should return 302 if not logged in', function (done) {
            request(app)
                .post('/api/events/564f31e60f299903c52129af/feedbacks')
                // .type('json')
                // .send('{"well": "Good weather"}')
                // OR
                .send({well: 'Good weather'})
                .expect(302, done)
            ;
        });
    });
});
