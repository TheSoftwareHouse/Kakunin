Feature: Test server delete request
    As a kakunin user
    I want to test restApi delete request

    Scenario: REST get example test
        Given I send "delete" request on "posts/1" endpoint
        Then the response code should be "200"
        And the response should match JSON schema:
    """
      {
            "title": "Delete schema",
            "type": "object"
       }
    """
