'use strict';

const User = {
    names: [
        'Dave',
        'Andrew',
        'Cindy',
        'Brenda'
    ],
    getNamesList: function () {
        return this.names.sort();
    }
};

module.exports = User;
