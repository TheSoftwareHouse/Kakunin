Feature: Tabular data
    As a kakunin user
    I want validate tabular data

    Scenario: Validate tabular data count
        Given I visit the "main" page
        When I click the "a[href='/tabular-data']" element
        Then the "tabularData" page is displayed
        And there are "at least 1" "table tr" elements
        And there are "above 3" "table tr" elements
        And there are "below 5" "table tr" elements
        And there are "within 3 5" "table tr" elements
        And there are "equal 4" "table tr" elements

    Scenario: Validate tabular data count and content, also check sorting
        Given I visit the "main" page
        When I click the "a[href='/tabular-data']" element
        Then the "tabularData" page is displayed
        And the "table tr" element is visible
        And there are "at least 4" following elements for element "table tr":
            | .index | r:validNumber |
        And there are "above 3" following elements for element "table tr":
            | .index | r:validNumber |
        And there are "equal 4" following elements for element "table tr":
            | .index | r:validNumber |
        And there are "below 5" following elements for element "table tr":
            | .index | r:validNumber |
        And there are "within 3-5" following elements for element "table tr":
            | .index | r:validNumber |
        And there are "equal 4" following elements for element "table tr":
            | .index      | r:validNumber   |
            | .id         | t:MY_CUSTOM_ID_ |
            | .name       | r:notEmpty      |
            | button.view | f:isVisible     |
            | button.view | f:isClickable   |
        And every "table tr" element should have the same value for element "button.view"
        And ".index" value on the "table tr" list is sorted in "ascending" order
        And ".descending-sort" value on the "table tr" list is sorted in "descending" order


    Scenario: Validate tabular data count and content with multiply checkers
        Given I visit the "main" page
        When I click the "a[href='/tabular-data']" element
        Then the "tabularData" page is displayed
        And the "table tr" element is visible
        And there are elements for element "table tr":
            | .index | r:validNumber | f:isVisible |             | f:isPresent |
            | .index |               |             | f:isVisible |             |

    Scenario: Validate exact tabular data by columns
        Given I visit the "main" page
        When I click the "a[href='/tabular-data']" element
        Then the "tabularData" page is displayed
        And there are following elements in table "table tr":
            | .index | nameLocator                       |
            | t:1    | t:Some custom name 1              |
            | t:2    | t:Some custom name 2              |
            | t:3    | t:Some custom name 3              |
            | t:4    | t:Some custom name 4              |
        And there are following elements in table "table tr":
            | .index | nameLocator                       |
            | t:1    | t:d:test-dictionary:custom-value1 |
            | t:2    | t:Some custom name 2              |
            | t:3    | t:Some custom name 3              |
            | t:4    | t:Some custom name 4              |
        And the element "table tr" should have an item with values:
            | .index | t:1         |
            | .index | f:isVisible |
        And the element "table tr" should not have an item with values:
            | .index | t:d:test-dictionary:non-existing |
            | .index | t:incorrect-number-value         |

    Scenario: Navigate to pages by using click steps
        Given I visit the "main" page
        When I click the ".valueForClickStep" element
        Then the "tabularData" page is displayed
