Feature: Verify displayed pge
    As a kakunin user
    I want to make sure I am on expected page

    Scenario: Verify relative page
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed

    Scenario: Verify external page
        Given I visit the "main" page
        When I click the "externalPageLink" element
        Then the "externalPage" page is displayed
