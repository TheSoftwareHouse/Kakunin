Feature: Navigation
    As a kakunin user
    I want to switch to selected iframe

    Scenario: Switch to iframe
        Given I visit the "main" page
        When I click the "a[href='/navigation/iframe']" element
        Then the "iframe" page is displayed
        And the "externalDiv" element is visible
        And the "internaldiv" element is not visible
        When switch to "iframeElemenet" iframe
        Then the "externalDiv" element is not visible
        And the "internaldiv" element is visible
        When switch to "default" iframe
        Then the "externalDiv" element is visible
        And the "internaldiv" element is not visible