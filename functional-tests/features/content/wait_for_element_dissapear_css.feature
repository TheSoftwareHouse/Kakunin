Feature: Element visibility
    As a kakunin user
    I want to wait for element to disappear

    Scenario: Check visibility - disappear step
        Given I visit the "main" page
        When I click the "a[href='/form/disappear']" element
        Then the "buttonForm" page is displayed
        When I click the "#button" element
        Then I wait for the "#button" element to disappear

    Scenario: Check visibility with - wait for condition step
        Given I visit the "main" page
        When I click the "buttonLink" element
        Then the "buttonForm" page is displayed
        When I click the "#button" element
        And I wait for "invisibilityOf" of the "#button" element
        Then the "#button" element is not visible
