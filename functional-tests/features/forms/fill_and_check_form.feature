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

    Scenario: Fill and check form fields - with extra third column
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed
        When I generate random "stringWithLength:10" as "storedStringWithLength"
        And I fill the "form" form with:
            | nameInput | v:storedStringWithLength |
        Then the "form" form is filled with:
            | nameInput | v:storedStringWithLength |
        When I fill the "form" form with:
            | nameInput           | d:test-dictionary:test-name |          |
            | descriptionTextarea | some description            | text     |
            | optionCheckboxes    | Checkbox Option 2           | checkbox |
            | optionCheckboxes    | Checkbox Option 3           | checkbox |
            | optionRadios        | third-radio-option          |          |
            | statusSelect        | unknown                     | select   |
        And I click the "submitButton" element
        Then the "simpleFormPost" page is displayed
        And the "form" form is filled with:
            | nameInput           | d:test-dictionary:test-name | text     |
            | descriptionTextarea | some description            |          |
            | optionCheckboxes    | Checkbox Option 2           | checkbox |
            | optionCheckboxes    | Checkbox Option 3           |          |
            | optionRadios        | third-radio-option          | radio    |
            | statusSelect        | unknown                     | select   |

    Scenario: Fill and check form fields - with extra third column - all filled
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed
        When I generate random "stringWithLength:10" as "storedStringWithLength"
        And I fill the "form" form with:
            | nameInput | v:storedStringWithLength |
        Then the "form" form is filled with:
            | nameInput | v:storedStringWithLength |
        When I fill the "form" form with:
            | nameInput           | d:test-dictionary:test-name | text     |
            | descriptionTextarea | some description            | text     |
            | optionCheckboxes    | Checkbox Option 2           | checkbox |
            | optionCheckboxes    | Checkbox Option 3           | checkbox |
            | optionRadios        | third-radio-option          | radio    |
            | statusSelect        | unknown                     | select   |
        And I click the "submitButton" element
        Then the "simpleFormPost" page is displayed
        And the "form" form is filled with:
            | nameInput           | d:test-dictionary:test-name | text     |
            | descriptionTextarea | some description            | text     |
            | optionCheckboxes    | Checkbox Option 2           | checkbox |
            | optionCheckboxes    | Checkbox Option 3           | checkbox |
            | optionRadios        | third-radio-option          | radio    |
            | statusSelect        | unknown                     | select   |

    Scenario: Fill input and textarea fields and then store the values and check if the form was filled with expected data
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed
        When I generate random "stringWithLength:6" as "storedStringWithLength"
        And I fill the "form" form with:
            | nameInput | v:storedStringWithLength |
        And I store the "nameInput" element text as "storedInputValue" variable
        Then the "form" form is filled with:
            | nameInput | v:storedStringWithLength |
            | nameInput | v:storedInputValue       |
        And there is element "nameInput" with value "t:v:storedInputValue"
        And there is element "nameInput" with value "t:v:storedStringWithLength"
        When I fill the "form" form with:
            | descriptionTextarea | g:personalData:email |
        And I store the "descriptionTextarea" element text as "storedTextareaValue" variable
        Then the "form" form is filled with:
            | descriptionTextarea | v:storedTextareaValue |
        And there is element "descriptionTextarea" with value "t:v:storedTextareaValue"
        And there is element "descriptionTextarea" with value "r:email"

    Scenario: Fill the input form and check if "value to text" transformer works properly
        Given I visit the "main" page
        When I click the "formLink" element
        Then the "simpleForm" page is displayed
        And I fill the "form" form with:
            | nameInput | tomg |
        And I store the "nameInput" element text as "storedInputValue" variable
        Then the "form" form is filled with:
            | nameInput | v:storedInputValue |
        And there is element "nameInput" with value "t:tomg"
        And there is element "nameInput" with value "t:v:storedInputValue"
        And there is element "nameInput" with value "t:d:test-dictionary:test-user"