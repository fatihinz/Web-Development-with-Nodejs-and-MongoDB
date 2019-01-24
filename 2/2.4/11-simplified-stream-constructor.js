'use strict';

const stream = require('stream');
const transform = new stream.Transform({
    transform: function (chunk, encoding, next) {
        // implement the method
    },
    flush: function (done) {
        // implement the method
    }
});
