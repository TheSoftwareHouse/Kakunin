Feature: Example feature file
    Scenario: Example scenario
        When I visit the "page" page
        And I generate random "name" as "myName"
        Then my matcher "e:name" matches "v:myName"
        And my matcher "e:name" matches "Bob"
