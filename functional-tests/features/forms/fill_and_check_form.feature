Feature: Forms
    As a kakunin user
    I want fill and check form fields

    Scenario: Fill and check form fields
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed
        When I fill the "form" form with:
            | nameInput           | d:test-dictionary:test-name |
            | descriptionTextarea | some description            |
            | optionCheckboxes    | Checkbox Option 2           |
            | optionCheckboxes    | Checkbox Option 3           |
            | optionRadios        | third-radio-option          |
            | statusSelect        | unknown                     |
        And I click the "submitButton" element
        Then the "simpleFormPost" page is displayed
        And the "form" form is filled with:
            | nameInput           | d:test-dictionary:test-name |
            | descriptionTextarea | some description            |
            | optionCheckboxes    | Checkbox Option 2           |
            | optionCheckboxes    | Checkbox Option 3           |
            | optionRadios        | third-radio-option          |
            | statusSelect        | unknown                     |
