Feature: Drag and drop
    As a kakunin user
    I want to be able to make operations on elements

    Scenario: Drag element and drop on the other one
        Given I visit the "dragAndDrop" page
        When I drag "#draggable" element and drop over "#droppable" element
        Then the "kittensInsideTarget" element is visible
