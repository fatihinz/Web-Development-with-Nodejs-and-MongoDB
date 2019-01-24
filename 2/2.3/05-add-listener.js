'use strict';

const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.addListener('newMail', function (subject) {
    console.log(subject);

    console.log('Notifying of new mail!');
});

eventEmitter.on('newMail', function () {
    console.log('Adding mail to list view');
});

eventEmitter.once('newMail', function () {
    console.log('I happen only once');
});
