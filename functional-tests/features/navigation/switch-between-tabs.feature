Feature: Navigation
    As a kakunin user
    I want to switch between browser tabs

    Scenario: Navigate by link click
        Given I visit the "main" page
        When I click the "matchersInNewTabLink" element
        And I switch to window number "2" of a browser
        Then the "matchers" page is displayed
        And there is element "dateElement" with value "f:isVisible"
        When I close the current browser tab
        Then the "main" page is displayed
        When I click the "matchersLink" element
        Then the "matchers" page is displayed
