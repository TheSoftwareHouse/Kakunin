Feature: Forms
    As a kakunin user
    I want fill and check form fields

    Scenario: Fill and check form fields
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed
        When I generate random "stringWithLength:10" as "storedStringWithLength"
        And I fill the "form" form with:
            | nameInput | v:storedStringWithLength |
        Then the "form" form is filled with:
            | nameInput | v:storedStringWithLength |
        When I fill the "form" form with:
            | input[name="name"]           | d:test-dictionary:test-name |
            | textarea[name="description"] | some description            |
            | input[type="checkbox"]       | Checkbox Option 2           |
            | input[type="checkbox"]       | Checkbox Option 3           |
            | input[type="radio"]          | third-radio-option          |
            | select[name="status"]        | unknown                     |
        And I click the "submitButton" element
        Then the "simpleFormPost" page is displayed
        And the "form" form is filled with:
            | input[name="name"]           | d:test-dictionary:test-name |
            | textarea[name="description"] | some description            |
            | input[type="checkbox"]       | Checkbox Option 2           |
            | input[type="checkbox"]       | Checkbox Option 3           |
            | input[type="radio"]          | third-radio-option          |
            | select[name="status"]        | unknown                     |
