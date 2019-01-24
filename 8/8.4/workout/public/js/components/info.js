'use strict';

const React = require('react');

const Info = React.createClass({
    render: function () {
        return (
            <div className="alert alert-info">
                Info element rendered by React
            </div>
        )
    }
});

module.exports = Info;
