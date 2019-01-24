'use strict';

function isNameProvided(name) {
    return !!name;
};

function getIntensity(intensity) {
    const availableIntensities = ['low', 'medium', 'high'];

    return availableIntensities.indexOf(intensity) > -1 ? intensity : 'low';
};

function getExercise(name, intensity) {
    let min = 1;
    let max = 5;

    switch (intensity) {
        case 'medium':
            min = 10;
            max = 25;
            break;

        case 'high':
            min = 50;
            max = 100;
            break;
    }

    let reps = getRandomNumber(min, max);

    return name + ' ' + reps + '\n';
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

module.exports = {
    isNameProvided: isNameProvided,
    getIntensity: getIntensity,
    getExercise: getExercise
};
