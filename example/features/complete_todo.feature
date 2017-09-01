Feature:

    Scenario: Select todo as completed
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And there is a todo "My todo"
        When I click the "todo" element
        And I click the "completeTodoButton" element
        Then there is element "toBeCompletedCount" with value "t:0"

    Scenario: Deselect completed todo
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And there is a completed todo "My todo"
        And there is element "toBeCompletedCount" with value "t:0"
        When I click the "todo" element
        And I click the "completeTodoButton" element
        Then there is element "toBeCompletedCount" with value "t:1"
