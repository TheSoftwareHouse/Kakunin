Feature: Test server post request using form data
    As a kakunin user
    I want to test restApi post request

    Scenario: REST get example test
        Given I send "POST" request on "postFormDataEndpoint" endpoint using form data:
            | name | adam1 |
        Then the response code should be "201"

    @test
    Scenario: REST upload example file
        Given I send "POST" request on "upload" endpoint using form data:
            | myFile |  | ./data/kakunin_logo.png |
        Then the response code should be "201"
