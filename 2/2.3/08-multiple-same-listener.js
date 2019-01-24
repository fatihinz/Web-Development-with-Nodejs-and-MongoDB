'use strict';

const events = require('events');
const eventEmitter = new events.EventEmitter();

function notify() {
    console.log('Notifying of new mail!');
}

eventEmitter.addListener('newMail', notify);
eventEmitter.addListener('newMail', notify);
eventEmitter.addListener('newMail', notify);

console.log(eventEmitter.listeners('newMail'));

eventEmitter.removeListener('newMail', notify);

console.log(eventEmitter.listeners('newMail'));

console.log(eventEmitter.getMaxListeners());
