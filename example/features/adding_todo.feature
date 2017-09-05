Feature:

    Scenario: Adding todo
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And the "addTodoForm" element is visible
        When I fill the "addTodoForm" form with:
            | todoInput | My new todo |
        And I press the "enter" key
        Then there are "equal 1" "todos" elements
