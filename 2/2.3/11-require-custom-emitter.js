'use strict';

const Box = require('./10-extending-event-emitter');

const box = new Box();

box.on('newMail', function () {
    console.log('Notifying of new mail');
});

box.emit('newMail');

box.emit('delete', 5);
