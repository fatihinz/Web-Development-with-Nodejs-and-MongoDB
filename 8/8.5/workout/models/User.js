'use strict';

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, lowercase: true },
    password: String,
    firstName: { type: String, required: 'First name is required' },
    lastName: { type: String, default: '' },
    age: { type: Number, min: 18, default: 18 },
    role: { type: String, default: 'user' }
});

userSchema.plugin(passportLocalMongoose);

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', userSchema);
