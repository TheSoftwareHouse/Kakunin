---
id: version-3.0.1-steps-rest
title: Rest api
original_id: steps-rest
---

# Steps used for testing REST api:

In order to configure url for api, please change `apiUrl` field in `functional-tests/kakunin.conf.js`. This will set url of application api.

## `I send ":methodName" request on ":endpoint" endpoint`

Sends to the given request method to given website endpoint.

For example, in case of GET request for /posts endpoint it should look like: 
```gherkin
I send "GET" request on "posts" endpoint
```

## `^I send ":methodName" request on ":endpoint" endpoint with JSON body:`

Sends request method to website endpoint requiring JSON body.

```gherkin
I send "POST" request on "posts" endpoint with JSON body:
    """
    {
        "title": "user",
        "body": "test"
    }
    """
```

## `^I send "methodName" request on ":endpoint" endpoint using form data:`

Sends request method to website endpoint using form data.

```gherkin
I send "POST" request on "posts" endpoint using form data:
    | title | user |
```

## `the response code should be ":statusCode"`

Verifies if the server response code has match to given one.

## `the response should exact match to body:`

Verifies if the server response body has exact match to given one.

```gherkin
the response should exact match to body:
    """
    {
        "userId": 1,
        "id": 1,
        "title": "user",
        "body": "test"
    }
    """
```

## `the response should match JSON schema:`

Verifies if the server response body has exact match to given JSON schema.

```gherkin
the response should exact match JSON schema:
    """
    {
        "title": "Test schema",
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            }
        },
        "required": ["id"]
    }
    """
```

## `I set request headers:`

Sets the request headers to given one till creating new request.

```gherkin
I set request headers:
    | Content-type | application/json |
    | accept       | */*              |
```
