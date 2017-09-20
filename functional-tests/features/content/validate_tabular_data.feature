Feature:
    As a kakunin user
    I want validate tabular data

    Scenario: Validate tabular data count
        Given I visit the "main" page
        When I click the "tabularDataLink" element
        Then the "tabularData" page is displayed
        And there are "equal 4" "rows" elements

    Scenario: Validate tabular data count and content
        Given I visit the "main" page
        When I click the "tabularDataLink" element
        Then the "tabularData" page is displayed
        And the "rows" element is present
        And the "rows" element is visible
        And there are "equal 4" following elements for element "rows":
            | indexLocator | r:validNumber   |
            | idLocator    | t:MY_CUSTOM_ID_ |
            | nameLocator  | r:notEmpty      |
            | viewButton   | f:isVisible     |
            | viewButton   | f:isClickable   |

    Scenario: Validate exact tabular data by columns
        Given I visit the "main" page
        When I click the "tabularDataLink" element
        Then the "tabularData" page is displayed
        And there are following elements in table "rows":
            | indexLocator   | nameLocator            |
            | t:1            | t:Some custom name 1 |
            | t:2            | t:Some custom name 2 |
            | t:3            | t:Some custom name 3 |
            | t:4            | t:Some custom name 4 |
