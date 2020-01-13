Feature: Verify displayed pge
    As a kakunin user
    I want to make sure I am on expected page

    Scenario: Verify relative page
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed

    Scenario: Verify absolute url page
        Given I visit the "main" page
        When I click the "absolutePageLink" element
        Then the "absolutePage" page is displayed

    Scenario: Verify external url page
        Given I visit the "main" page
        When I click the "googleLink" element
        Then the "google" page is displayed

    Scenario: Verify Simple Button disappear page
        Given I visit the "main" page
        When I click the ".emptyPageForClickStep" element
        And I click the CLICK ME button in simple button disappear page
        Then I wait for "5" seconds
        And the CLICK ME button is not visible