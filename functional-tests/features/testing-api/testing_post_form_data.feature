@wip
Feature: Test server post request using form data
    As a kakunin user
    I want to test restApi post request

    Scenario: REST get example test
        Given I send "POST" request on "postFormDataEndpoint" endpoint using form data:
        """
        {
            "name": "adam",
            "title": "test"
        }
        """
        Then the response code should be "201"
