#!/usr/bin/env node

'use strict';

const args = process.argv.slice(2);

let name = args[0];

if (!name) {
    process.stdout.write('Please provide your name!');

    process.exit(1);
}

const availableIntensities = ['low', 'medium', 'high'];
let intensity = availableIntensities.indexOf(args[1]) > -1 ? args[1] : 'low';

process.stdout.write('Hello ' + name + '\n');
process.stdout.write('You chose ' + intensity + ' intensity workout\n');

process.stdout.write('\nBelow are your exercises:\n');

function exercise(name, intensity) {
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

    let reps = Math.floor(Math.random() * (max - min) + min);

    process.stdout.write(name + ' ' + reps + '\n');
}

exercise('Push-ups:', intensity);
exercise('Pull-ups:', intensity);
exercise('Squats:  ', intensity);
exercise('Plank:   ', intensity);
