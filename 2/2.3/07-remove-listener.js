'use strict';

const events = require('events');
const eventEmitter = new events.EventEmitter();

function notify() {
    console.log('Notifying of new mail!');
}

eventEmitter.addListener('newMail', notify);

eventEmitter.on('newMail', function () {
    console.log('Adding mail to list view');
});

console.log(eventEmitter.listeners('newMail'));

eventEmitter.removeListener('newMail', notify);

console.log(eventEmitter.listeners('newMail'));

eventEmitter.removeAllListeners('newMail');

console.log(eventEmitter.listeners('newMail'));
