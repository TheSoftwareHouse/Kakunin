---
id: version-3.0.1-testing-rest-api
title: REST API examples
original_id: testing-rest-api
---

# Testing REST API of your application

In this section examples of using steps provided for testing, REST API will be provided.
All examples can be checked on site https://reqres.in/ which is simple REST API service

# Available methods

At this moment Kakunin supports methods for REST API:
- GET
- POST
- DELETE
- PATCH

Also, You can set the headers for the request.

# Making GET request

In order to create get request and verify if the response is ok you need to create scenario step: 

```gherkin
Given I send "GET" request on "/api/users/2" endpoint
Then the response code should be "200"
```

This scenario will create a get request to the application and verify if the response was 200. 
The response is stored till creating another request. So if We want to test the response body of a server we can create a scenario like:

```gherkin
Given I send "GET" request on "/api/users/2" endpoint
Then the response code should be "200"
And the response should exact match to body:
    """
    {
        "data": {
            "id": 2,
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
        }
    }
    """
```

Based on this We can also check if the response matches schema that we have provided by using step:

```gherkin
Then the response should exact match JSON schema:
```

# Making POST request

In order to create post request and attach the JSON body to it You need to create a scenario:

```gherkin
Given I send "POST" request on "/api/users" endpoint with body:
  """
  {
      "name": "morpheus",
      "job": "leader"
  }
  """
Then the response code should be "201"
```

or you can create post request and attach the form data to it: 

```gherkin
Given I send "POST" request on "/api/users" endpoint using form data:
  | name | morpheus |
Then the response code should be "201"
```

This scenario will create a post request to the application and verify if response was 201 (created). 
The response is stored till creating another request. So if We want to test the response body of a server we can create scenarios
like before:

```gherkin
Given I send "POST" request on "/api/users" endpoint with body:
  """
  {
      "name": "morpheus",
      "job": "leader"
  }
  """
Then the response code should be "201"
And the response should match JSON schema:
  """
  {
      "title": "Post schema",
      "type": "object",
      "properties": {
          "name": {
              "type": "string"
          },
          "job": {
              "type": "string"
          }
      },
      "required": ["name", "job"]
  }
  """
```

Scenario like that will verify if the post request was executed and response schema matches given one.

# Making DELETE request

Delete request works similarly to get request. Example of delete scenario:

```gherkin
Given I send "DELETE" request on "/api/users/2" endpoint
Then the response code should be "204"
```

# Making PATCH request

Patch request works similarly to post request. Example of patch scenario: 

```gherkin
Given I send "PATCH" request on "/api/users/2" endpoint with JSON body:
  """
  {
      "name": "morpheus",
      "job": "zion resident"
  }
  """
Then the response code should be "200"
And the response should exact match to body:
  """
  {
      "name": "morpheus",
      "job": "zion resident",
      "updatedAt": "2019-02-12T18:25:06.001Z"
  }
  """
```

# Setting headers for request

Sometimes We want to set the headers for next request. In order to achieve this, We can create scenario like:

```gherkin
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
```
 This scenario will set "User-Agent" header of next request to "Mozilla".
