#!/usr/bin/env node

'use strict';

const program = require('commander');
const pkg = require('./package.json');
const colors = require('colors');
const workout = require('./lib/hello-workout');

program
    .version(pkg.version)
    .option('-i, --intensity [low|medium|high]', 'select the intensity of workout')
    .parse(process.argv);

const name = program.args[0];

if (!workout.isNameProvided(name)) {
    process.stdout.write('Please provide your name!');

    process.exit(1);
}


const intensity = workout.getIntensity(program.intensity);

process.stdout.write('Hello ' + name.red + '\n');
process.stdout.write('You chose ' + intensity.yellow + ' intensity workout\n');

process.stdout.write('\nBelow are your exercises:\n');

process.stdout.write(workout.getExercise('Push-ups:', intensity));
process.stdout.write(workout.getExercise('Pull-ups:', intensity));
process.stdout.write(workout.getExercise('Squats:  ', intensity));
process.stdout.write(workout.getExercise('Plank:   ', intensity));
