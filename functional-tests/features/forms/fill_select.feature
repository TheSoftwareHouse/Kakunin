Feature: Forms
    As a kakunin user
    I want to check options

    Scenario: Fill and check form fields
        Given I visit the "main" page
        When I click the "formSelectLink" element
        Then the "simpleSelectForm" page is displayed
        And there is "selectPerson" element with following dropdown list options:
            | Person3 |
            | Person2 |
            | Person1 |
            | Person4 |
