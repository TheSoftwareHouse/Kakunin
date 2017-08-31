Feature:

    Scenario: Displaying all todos
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And there is a todo "My todo"
        And there is a completed todo "My completed"
        When I click the "showAllButton" element
        Then there are "equal 2" "todos" elements

    Scenario: Displaying active todos
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And there is a todo "My todo"
        And there is a completed todo "My completed"
        When I click the "showActiveButton" element
        Then there are "equal 1" following elements for element "todos":
            | element   | value     |
            | todoLabel | t:My todo |
        And I click the "showAllButton" element

    Scenario: Displaying completed todos
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And there is a todo "My todo"
        And there is a completed todo "My completed"
        When I click the "showCompletedButton" element
        Then there are "equal 1" following elements for element "todos":
            | element   | value     |
            | todoLabel | t:My completed |
        And I click the "showAllButton" element

    Scenario: Clear todos
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And there is a completed todo "My completed"
        Then there are "equal 1" "todos" elements
        When I click the "clearTodosButton" element
        Then the "todos" element is not present
