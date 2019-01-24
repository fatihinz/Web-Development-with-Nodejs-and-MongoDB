'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const App = React.createFactory(require('./components/app'));
require('./app/main');
require('../css/main.js');

if (typeof window !== 'undefined') {
    window.onload = function () {
        const element = document.getElementById('react');

        if (element) {
            ReactDOM.render(App(), element);
        }
    }
}
