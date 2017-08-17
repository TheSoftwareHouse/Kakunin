Feature:
    As a kakunin user
    I want to navigate to selected page

    Scenario: Navigate by link click
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed
        And the "form" element is visible
