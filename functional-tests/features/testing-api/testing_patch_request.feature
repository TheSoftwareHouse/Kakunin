Feature: Test patch endpoint
    As a kakunin user
    I want to set test the patch endpoint

    Scenario: REST patch example test
        Given I send "PATCH" request on "patchTestEndpoint" endpoint with JSON body:
        """
        {
            "first_name": "adam"
        }
        """
        Then the response code should be "200"

