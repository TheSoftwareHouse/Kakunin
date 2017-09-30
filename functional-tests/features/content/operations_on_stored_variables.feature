Feature: Store table and compare jsons
    As a kakunin user
    I want to store values as variables

    Scenario: Store table and compare jsons
        Given I visit the "main" page
        When I click the "tabularDataLink" element
        Then the "tabularData" page is displayed
        When I store table "rows" rows as "tableValue" with columns:
            | indexLocator    |
            | descendingIndex |
            | viewButton      |
        Then compare given JSON string with stored "tableValue" JSON:
            """
            [
                ["1", "4", "View"],
                ["2", "3", "View"],
                ["3", "2", "View"],
                ["4", "1", "View"]
            ]
            """
