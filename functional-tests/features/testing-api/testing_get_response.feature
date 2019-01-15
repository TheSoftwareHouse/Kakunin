Feature: Store table and compare jsons
    As a kakunin user
    I want to test restApi
@wip
    Scenario: REST example test
    Given I send "GET" request on "/people/1/" endpoint
    Then the response code should be "200"
    And the response should exact match to body:
    """
              {
                "name": "Luke Skywalker",
                "height": "172",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
                "homeworld": "https://swapi.co/api/planets/1/",
                "films": [
                    "https://swapi.co/api/films/2/",
                    "https://swapi.co/api/films/6/",
                    "https://swapi.co/api/films/3/",
                    "https://swapi.co/api/films/1/",
                    "https://swapi.co/api/films/7/"
                ],
                "species": [
                    "https://swapi.co/api/species/1/"
                ],
                "vehicles": [
                    "https://swapi.co/api/vehicles/14/",
                    "https://swapi.co/api/vehicles/30/"
                ],
                "starships": [
                    "https://swapi.co/api/starships/12/",
                    "https://swapi.co/api/starships/22/"
                ],
                "created": "2014-12-09T13:50:51.644000Z",
                "edited": "2014-12-20T21:17:56.891000Z",
                "url": "https://swapi.co/api/people/1/"}
            """
