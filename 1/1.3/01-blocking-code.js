'use strict';

console.log('Start script');

setTimeout(function () { console.log('Timeout output'); }, 1000);

let until = new Date().getTime() + 3000;

while (new Date().getTime() < until) {
}

console.log('Output after 3 second loop');
