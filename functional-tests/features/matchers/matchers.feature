Feature: Matchers
    As a Kakunin user
    I want to fill input and then check if the value matches the expected result

Scenario: Fill the input and check value
    Given I visit the "main" page
    When I click the "formLink" element
    Then the "simpleForm" page is displayed
    And I fill the "form" form with:
    | nameInput | test |
    And there is element "nameInput" with value "t:test"
    And there is element "nameInput" containing "test" text
    And there is no element "nameInput" with value "t:hello"
    And there is no element "nameInput" containing "hello" text
    And there is element "nameInput" matching "isVisible" matcher
    And there is no element "nameInput" matching "isNotVisible" matcher
    And there is element "nameInput" with "notEmpty" regex
    And there is no element "nameInput" with "number" regex



