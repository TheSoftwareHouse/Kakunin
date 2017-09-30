Feature: Element visibility
    As a kakunin user
    I want to wait for element to disappear

    Scenario: Check visibility
        Given I visit the "main" page
        When I click the "buttonLink" element
        Then the "buttonForm" page is displayed
        When I click the "disappearBtn" element
        Then I wait for the "disappearBtn" element to disappear

