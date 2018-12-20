Feature: Test server post response
    As a kakunin user
    I want to test restApi post request

    Scenario: REST post example test
        Given I send "POST" request on "/postTestEndpoint" endpoint with JSON body:
        """
        {
            "name": "adam",
            "title": "test"
        }
        """

        Then the response code should be "201"
        Then the response should match JSON schema:
        """
        {
            "title": "Posts schema",
            "type": "object",
            "properties": {
                "code": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                    },
                "title": {
                    "type": "string"
                }
            },
            "required": ["code", "name", "title"]
        }
        """
