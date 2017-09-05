Feature:

    Scenario: Removing todo
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And there is a todo "My todo"
        When I click the "todo" element
        And I wait for "visibilityOf" of the "removeTodoButton" element
        And I click the "removeTodoButton" element
        Then there are "equal 0" "todos" elements
