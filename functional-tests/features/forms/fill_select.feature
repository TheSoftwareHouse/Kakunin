Feature: Forms
    As a kakunin user
    I want to check options

    Scenario: Fill and check form fields
        Given I visit the "main" page
        When I click the "formSelectLink" element
        Then the "simpleSelectForm" page is displayed
        And there are "personOption" dropdown list elements with following options:
            | Person3 |
            | Person2 |
            | Person1 |
            | Person4 |
