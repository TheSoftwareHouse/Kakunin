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

    Scenario: Compare stored values with the content from a xlsx file - equal rows and four stored values
        Given I store the content from "http://localhost:8080/xlsx/data-9rows" endpoint as "storedTable" variable
        Then the file "example.xlsx" contains table data stored under "storedTable" variable

    Scenario: Compare stored values with the content from a xlsx file - equal rows and one stored value
        Given I store the content from "http://localhost:8080/xlsx/data-9rows-part" endpoint as "storedTable" variable
        Then the file "example.xlsx" contains table data stored under "storedTable" variable

    Scenario: Compare stored values with the content from a xlsx file - three rows and four stored values
        Given I store the content from "http://localhost:8080/xlsx/data-3rows" endpoint as "storedTable" variable
        Then the file "example.xlsx" contains table data stored under "storedTable" variable

    Scenario: Compare stored values with the content from a xlsx file - three rows and two stored values
        Given I store the content from "http://localhost:8080/xlsx/data-3rows-part" endpoint as "storedTable" variable
        Then the file "example.xlsx" contains table data stored under "storedTable" variable

    Scenario: Compare stored values with the content from a xlsx file - one row and four stored values
        Given I store the content from "http://localhost:8080/xlsx/data-1row" endpoint as "storedTable" variable
        Then the file "example.xlsx" contains table data stored under "storedTable" variable

    Scenario: Compare stored values with the content from a xlsx file - one row and two stored values
        Given I store the content from "http://localhost:8080/xlsx/data-1row-part" endpoint as "storedTable" variable
        Then the file "example.xlsx" contains table data stored under "storedTable" variable
