# Group Events

Manage events.

## Event feedback [/events/{id}/feedbacks]

+ Parameters

    + id (required, string, `5649889a73cbcea31da170c8`) ... The unique identifier of the event

### Leave feedback [POST]

+ Request Leave feedback for event (application/json)

        {
          "well": "Weather was good",
          "better": "More refreshments",
          "volunteer": "on"
        }

+ Response 201 (application/json)

        {
          "data": [
            {
              "id": "5649889a73cbcea31da170c8",
              "name": "Paradise Linear Park Brisk walk regardless of weather",
              "external_id": "kqzvglytpbvb",
              "feedback": [
                {
                  "attendee": "5643200b3c064041365e8d6e",
                  "answers": {
                    "volunteer": true,
                    "better": "More refreshments",
                    "well": "Weather was good"
                  },
                  "created": "2015-11-16T09:36:20.222Z",
                  "id": "5649a3942caf075a23619640"
                }
              ]
            }
          ]
        }

### Update feedback [PUT]

+ Request Update feedback for event

    + Headers

            <!-- include(headers/json.md) -->

    + Body

            <!-- include(requests/update-feedback.json) -->

+ Response 200

    + Headers

            Content-Type: application/json

    + Body

            <!-- include(responses/update-feedback.json) -->

### Remove feedback [DELETE]

+ Request Remove feedback from an event (application/json)

+ Response 204 (application/json)

+ Response 404 (application/json)

        {
          "errors": [
            {
              "code": "EVENT-FEEDBACK-NOT-FOUND-DELETE",
              "status": 404,
              "title": "Feedback not found",
              "details": "No feedback to delete found"
            }
          ]
        }

## Events list [/events]

### Get list [GET]

+ Request Get events list (application/json)

+ Response 200 (application/json)

        <!-- include(responses/events.json) -->
