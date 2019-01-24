var jQuery = require('jquery');
var Handlebars = require('handlebars');
var app = {
    onDashboardLoad: function (event) {
        event.preventDefault();

        var eventsWithVolunteers = app.getEventsWithVolunteersElement();
        var url = app.getEventsWithVolunteersUrl(eventsWithVolunteers);

        jQuery.getJSON(url)
            .then(function (data) {
                eventsWithVolunteers.html(
                    app.renderDashboardTemplate(data)
                );
            })
        ;
    },

    renderDashboardTemplate: function (data) {
        var source = jQuery('#events-with-volunteers-template').html();
        var template = Handlebars.compile(source);
        var html = '<p>No events with volunteers</p>';

        if (data.data.length) {
            html = template(data);
        }

        return html;
    },

    getEventsWithVolunteersElement: function () {
        return jQuery('#events-with-volunteers');
    },

    getEventsWithVolunteersUrl: function (element) {
        return element.find('a:first').attr('href');
    }
};

module.exports = app;
