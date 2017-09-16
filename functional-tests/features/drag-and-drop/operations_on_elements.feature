Feature:
    As a kakunin user
    I want to be able to make operations on elements

    Scenario: Drag element and drop on the other one
        Given I visit the "dragAndDrop" page
        When I drag "kittens" element and drop over "target" element
        Then the "kittensInsideTarget" element is visible
