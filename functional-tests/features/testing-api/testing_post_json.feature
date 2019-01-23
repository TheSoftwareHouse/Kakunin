Feature: Test server post response
    As a kakunin user
    I want to test restApi post request

    Scenario: REST post example test
        Given I send "POST" request on "posts" endpoint with body:
        """
        {
            "title": "adam",
            "body": "test"
        }
        """

        Then the response code should be "201"
        Then the response should match JSON schema:
        """
        {
            "title": "Posts schema",
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "title": {
                    "type": "string"
                    },
                "body": {
                    "type": "string"
                }
            },
            "required": ["id", "title", "body"]
        }
        """
