Feature: Matchers
    As a kakunin user
    I want to navigate to matcher page and match current date

    Scenario: I want to match current date
        Given I visit the "main" page
        When I click the "matchersLink" element
        Then the "matchers" page is displayed
        And there is element "dateElement" with value "f:currentDate:{yyyy}-{MM}-{dd}"
