Feature: Test server delete request
    As a kakunin user
    I want to test restApi delete request

    Scenario: REST get example test
        Given I send "delete" request on "deleteTestEndpoint" endpoint
        Then the response code should be "200"
