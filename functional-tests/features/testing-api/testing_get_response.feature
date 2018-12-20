Feature: Test server get response
    As a kakunin user
    I want to test restApi get response

    Scenario: REST get example test
    Given I send "GET" request on "/getTestEndpoint" endpoint
    Then the response code should be "200"
    And the response should exact match to body:
    """
      {
        "id": 1,
        "title": "Kaunin",
        "body": "test"
       }
    """
