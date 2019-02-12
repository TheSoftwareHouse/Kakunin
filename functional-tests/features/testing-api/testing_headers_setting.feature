Feature: Test setting headers
    As a kakunin user
    I want to set the headers

    Scenario: Setting http headers
        Given I set request headers:
        | User-Agent | Mozilla |
        When I send "POST" request on "postTestEndpoint" endpoint with JSON body:
        """
        {
            "title": "adam",
            "body": "test"
        }
        """
        Then the response code should be "403"
