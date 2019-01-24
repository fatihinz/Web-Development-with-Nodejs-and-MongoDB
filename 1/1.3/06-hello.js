#!/usr/bin/env node

let readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('What is your name? ', function (answer) {
    console.log('Hello ' + answer);

    readline.close();
});
