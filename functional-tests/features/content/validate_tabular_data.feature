Feature: Tabular data
    As a kakunin user
    I want validate tabular data

    Scenario: Validate tabular data count
        Given I visit the "main" page
        When I click the "tabularDataLink" element
        Then the "tabularData" page is displayed
        And there are "at least 1" "rows" elements
        And there are "above 3" "rows" elements
        And there are "below 5" "rows" elements
        And there are "within 3 5" "rows" elements
        And there are "equal 4" "rows" elements

    Scenario: Validate tabular data count and content, also check sorting
        Given I visit the "main" page
        When I click the "tabularDataLink" element
        Then the "tabularData" page is displayed
        And the "rows" element is visible
        And there are "at least 4" following elements for element "rows":
            | indexLocator | r:validNumber |
        And there are "above 3" following elements for element "rows":
            | indexLocator | r:validNumber |
        And there are "equal 4" following elements for element "rows":
            | indexLocator | r:validNumber |
        And there are "below 5" following elements for element "rows":
            | indexLocator | r:validNumber |
        And there are "within 3-5" following elements for element "rows":
            | indexLocator | r:validNumber |
        And there are "equal 4" following elements for element "rows":
            | indexLocator | r:validNumber   |
            | idLocator    | t:MY_CUSTOM_ID_ |
            | nameLocator  | r:notEmpty      |
            | viewButton   | f:isVisible     |
            | viewButton   | f:isClickable   |
        And every "rows" element should have the same value for element "viewButton"
        And "indexLocator" value on the "rows" list is sorted in "ascending" order
        And "descendingIndex" value on the "rows" list is sorted in "descending" order

    Scenario: Validate tabular data count and content with multiply checkers
        Given I visit the "main" page
        When I click the "tabularDataLink" element
        Then the "tabularData" page is displayed
        And the "rows" element is visible
        And there are elements for element "rows":
            | indexLocator | r:validNumber | f:isVisible |             | f:isPresent |
            | indexLocator |               |             | f:isVisible |             |

    Scenario: Validate exact tabular data by columns
        Given I visit the "main" page
        When I click the "tabularDataLink" element
        Then the "tabularData" page is displayed
        And there are following elements in table "rows":
            | indexLocator | nameLocator          |
            | t:1          | t:Some custom name 1 |
            | t:2          | t:Some custom name 2 |
            | t:3          | t:Some custom name 3 |
            | t:4          | t:Some custom name 4 |
        And the element "rows" should have an item with values:
            | indexLocator | t:1         |
            | indexLocator | f:isVisible |
        And the element "rows" should not have an item with values:
            | indexLocator | t:incorrect-number-value |

    Scenario: Navigate to pages by using click steps
        Given I visit the "main" page
        When I click the "valueToClick" element
        Then the "tabularData" page is displayed
