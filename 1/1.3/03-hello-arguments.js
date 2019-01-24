#!/usr/bin/env node

console.log('Argument vector');
console.log(process.argv);

let args = process.argv.slice(2);

console.log('\nArguments after slicing');
console.log(args);

let name = args[0];

if (!name) {
    throw Error('\nYou have not given your name, bye');
}

console.log('\nHello ' + name);
