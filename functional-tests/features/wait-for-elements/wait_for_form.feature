Feature: Wait for forms
    As a kakunin user
    I want fill and check form fields

    Scenario: Fill and check form fields
        Given I visit the "main" page
        When I click the "appearForm" element
        Then the "appearSimpleForm" page is displayed
        When I click the "formAppearBtn" element
        And I fill the "form" form with:
            | nameInput           | d:test-dictionary:test-name |
            | descriptionTextarea | some description            |
            | optionCheckboxes    | Checkbox Option 2           |
            | optionCheckboxes    | Checkbox Option 3           |
            | optionRadios        | third-radio-option          |
            | statusSelect        | unknown                     |
        Then the "form" form is filled with:
            | nameInput           | d:test-dictionary:test-name |
            | descriptionTextarea | some description            |
            | optionCheckboxes    | Checkbox Option 2           |
            | optionCheckboxes    | Checkbox Option 3           |
            | optionRadios        | third-radio-option          |
            | statusSelect        | unknown                     |
        When I click the "submitButton" element
        Then the "appearSimpleFormPost" page is displayed
