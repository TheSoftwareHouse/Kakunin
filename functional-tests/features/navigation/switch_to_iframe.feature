Feature: Navigation
    As a kakunin user
    I want to switch to selected iframe

    Scenario: Switch to iframe
        Given I visit the "main" page
        When I click the "iframeLink" element
        Then the "iframe" page is displayed
        And the "externalDiv" element is visible
        And the "internalDiv" element is not visible
        When I switch to "iframeElement" iframe
        Then the "externalDiv" element is not visible
        And the "internalDiv" element is visible
        When I switch to "default" iframe
        Then the "externalDiv" element is visible
        And the "internalDiv" element is not visible
