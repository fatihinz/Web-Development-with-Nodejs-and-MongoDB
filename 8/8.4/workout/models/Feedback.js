'use strict';

const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    created: { type: Date, default: Date.now },
    attendee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answers: mongoose.SchemaTypes.Mixed
});

feedbackSchema.set('toJSON', {
    transform: function (document, ret, options) {
        ret.id = document._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
