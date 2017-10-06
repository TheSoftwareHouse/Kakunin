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
