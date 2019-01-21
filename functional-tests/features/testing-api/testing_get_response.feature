Feature: Test server get response
    As a kakunin user
    I want to test restApi get response

    Scenario: REST get example test
    Given I send "GET" request on "posts/1" endpoint
    Then the response code should be "200"
    And the response should exact match to body:
    """
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
       }
    """
