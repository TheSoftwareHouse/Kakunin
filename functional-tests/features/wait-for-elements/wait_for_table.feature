Feature: Wait for Tabular data
    As a kakunin user
    I want validate tabular data which will appear in future

    Scenario: Validate tabular data count and content, also check sorting
        Given I visit the "main" page
        When I click the "appearTable" element
        Then the "appearTabularData" page is displayed
        When I click the "tableAppearBtn" element
        Then there are "equal 4" following elements for element "rows":
            | indexLocator | r:validNumber                 |
            | idLocator    | t:MY_CUSTOM_ID_               |
            | idLocator    | t:d:test-dictionary:custom-id |
            | nameLocator  | r:notEmpty                    |
            | viewButton   | f:isVisible                   |
            | viewButton   | f:isClickable                 |
        And every "rows" element should have the same value for element "viewButton"
        And "indexLocator" value on the "rows" list is sorted in "ascending" order
        And "descendingIndex" value on the "rows" list is sorted in "descending" order

    Scenario: Validate tabular data count and content, also check sorting
        Given I visit the "main" page
        When I click the "appearTable" element
        Then the "appearTabularData" page is displayed
        When I click the "tableAppearBtn" element
        And I store table "rows" rows as "tableValue" with columns:
            | indexLocator |
            | idLocator    |
            | nameLocator  |
        Then compare given JSON string with stored "tableValue" JSON:
            """
            [
                [
                    "1",
                    "MY_CUSTOM_ID_1",
                    "Some custom name 1"
                ],
                [
                    "2",
                    "MY_CUSTOM_ID_2",
                    "Some custom name 2"
                ],
                [
                    "3",
                    "MY_CUSTOM_ID_3",
                    "Some custom name 3"
                ],
                [
                    "4",
                    "MY_CUSTOM_ID_4",
                    "Some custom name 4"
                ]
            ]
            """
