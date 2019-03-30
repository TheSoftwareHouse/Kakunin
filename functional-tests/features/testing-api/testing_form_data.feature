Feature: Test server post request using form data
    As a kakunin user
    I want to test restApi post request

    Scenario: REST get example test
        Given I send "delete" request on "deleteTestEndpoint" endpoint
        Then the response code should be "200"
