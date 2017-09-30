Feature: Navigation
    As a kakunin user
    I want to navigate to selected page

    Scenario: Navigate by link click
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed
        And the "form" element is visible

    Scenario: Navigate to parametrized url
        Given I visit the "navigationPages" page with parameters:
            | pageId | myPageId    |
            | title  | myPageTitle |
        Then there is element "pageId" with value "t:myPageId"
        And there is element "title" with value "t:myPageTitle"
