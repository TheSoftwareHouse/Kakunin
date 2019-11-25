Feature: Matchers
    As a Kakunin user
    I want to fill input and then check if the value matches the expected result

    Scenario: Fill the input and check value
        Given I visit the "main" page
        When I click the "a[href='/form/simple']" element
        Then the "simpleForm" page is displayed
        And I fill the "form" form with:
            | input[name="name"] | test |
        And there is element "input[name='name']" with value "t:test"
        And there is element "input[name='name']" containing "test" text
        And there is no element "input[name='name']" with value "t:hello"
        And there is no element "input[name='name']" with value "t:d:test-dictionary:non-existing"
        And there is no element "input[name='name']" containing "hello" text
        And there is element "input[name='name']" matching "isVisible" matcher
        And there is no element "input[name='name']" matching "isNotVisible" matcher
        And there is element "input[name='name']" with "notEmpty" regex
        And there is no element "input[name='name']" with "number" regex



