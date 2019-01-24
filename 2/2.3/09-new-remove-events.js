'use strict';

const events = require('events');
const eventEmitter = new events.EventEmitter();

function notify() {
    console.log('Notifying of new mail!');
}

eventEmitter.on('newListener', function () {
    console.log('Listener added');
});

eventEmitter.on('removeListener', function () {
    console.log('Listener removed');
});

eventEmitter.addListener('newMail', notify);

eventEmitter.removeListener('newMail', notify);
