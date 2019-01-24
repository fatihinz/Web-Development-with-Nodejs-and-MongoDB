$(document).ready(function () {
    var feedbackButton = $('#button-leave-feedback');
    var feedbackForm = $('#feedback-form');
    var removeFeedbackButton = feedbackForm.find('#button-remove-feedback');
    var flashMessages = $('.flash-messages');
    var eventsWithVolunteers = $('#events-with-volunteers');

    function createAlert(type, message) {
        return $('<p>')
            .addClass('alert alert-' + type)
            .text(message);
    };

    function formDataToJSON(form) {
        var serializedData = form.serializeArray();
        var jsonData = {};

        for (var i = 0, length = serializedData.length; i < length; i++) {
            var input = serializedData[i];

            jsonData[input.name] = input.value;
        }

        return jsonData;
    }

    feedbackButton.on('click', function (event) {
        event.preventDefault();

        feedbackButton.parent().siblings().first().removeClass('hidden');
        feedbackButton.parent().remove();
    });

    feedbackForm.submit(function (event) {
        event.preventDefault();

        var url = feedbackForm.attr('action');
        var method = removeFeedbackButton.length ? 'PUT' : 'POST';
        var formData = formDataToJSON(feedbackForm);

        $.ajax({
            method: method,
            url: url,
            data: JSON.stringify(formData),
            contentType: 'application/json'
        })
        .then(function (data) {
            flashMessages.text('');

            flashMessages.append(createAlert('success', 'Feedback updated'));

            if (!removeFeedbackButton.length) {
                location.reload();
            }
        }, function (jqXHR) {
            var data = JSON.parse(jqXHR.responseText);

            flashMessages.text('');

            for (var i = 0, length = data.errors.length; i < length; i++) {
                flashMessages.append(createAlert('danger', data.errors[i].details));
            }
        });
    });

    removeFeedbackButton.on('click', function (event) {
        event.preventDefault();

        var url = removeFeedbackButton.attr('href');

        $.ajax({
            method: 'DELETE',
            url: url,
            contentType: 'application/json'
        })
        .then(function (data) {
            location.reload();
        }, function (jqXHR) {
            var data = JSON.parse(jqXHR.responseText);

            flashMessages.text('');

            for (var i = 0, length = data.errors.length; i < length; i++) {
                flashMessages.append(createAlert('danger', data.errors[i].details));
            }
        });
    });

    eventsWithVolunteers.find('a:first').on('click', function (event) {
        event.preventDefault();

        var url = eventsWithVolunteers.find('a:first').attr('href');
        var source = $('#events-with-volunteers-template').html();
        var template = Handlebars.compile(source);
        var html = '<p>No events with volunteers</p>';

        $.getJSON(url)
        .then(function (data) {
            if (data.data.length) {
                html = template(data);
            }

            eventsWithVolunteers.html(html);
        });
    });
});
