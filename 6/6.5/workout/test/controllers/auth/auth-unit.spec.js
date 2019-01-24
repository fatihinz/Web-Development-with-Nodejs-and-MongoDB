'use strict';

const should = require('chai').should;
const sinon = require('sinon');

const login = require('./../../../controllers/auth/login.js');

describe('Auth controller', function () {
    describe('GET /login', function () {
        it('should render the page', function () {
            let request, response, spy;

            request = response = {};
            spy = response.render = sinon.spy();

            login(request, response);

            spy.withArgs('auth/login').calledOnce.should.be.true;
        });
    });
});
