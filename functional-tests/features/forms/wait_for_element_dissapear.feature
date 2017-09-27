Feature:
    As a kakunin user
    I want to wait for element disappear

    Scenario: Fill and check form fields
        Given I visit the "main" page
        When I click the "buttonLink" element
        Then the "buttonForm" page is displayed
        When I click the "disappearBtn" element
        Then I wait for the "disappearBtn" element to disappear

