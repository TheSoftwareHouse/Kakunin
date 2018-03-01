Feature: Element visibility
    As a kakunin user
    I want to wait for element to disappear

    Scenario: Check visibility - disappear step
        Given I visit the "main" page
        When I click the "buttonLink" element
        Then the "buttonForm" page is displayed
        When I click the "disappearBtn" element
        Then I wait for the "disappearBtn" element to disappear

    Scenario: Check visibility with - wait for condition step
        Given I visit the "main" page
        When I click the "buttonLink" element
        Then the "buttonForm" page is displayed
        When I click the "disappearBtn" element
        And I wait for "invisibilityOf" of the "disappearBtn" element
        Then the "disappearBtn" element is not visible
