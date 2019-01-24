'use strict';

const should = require('chai').should();
const workout = require('../lib/hello-workout');

describe('Hello Workout script', function () {
    it('should be false if no name provided', function () {
        workout.isNameProvided(undefined).should.be.false;
    });

    it('should be true if name is provided', function () {
        workout.isNameProvided('Andrew').should.be.true;
    });

    it('should be low intensity by default', function () {
        workout.getIntensity().should.equal('low');
    });

    it('should be low intensity', function () {
        workout.getIntensity('low').should.equal('low');
    });

    it('should be medium intensity', function () {
        workout.getIntensity('medium').should.equal('medium');
    });

    it('should be high intensity', function () {
        workout.getIntensity('high').should.equal('high');
    });

    it('should be low intensity if not available intensity provided', function () {
        workout.getIntensity('easy').should.equal('low');
    });
});
