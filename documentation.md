#Documentation

##1. Global variables

### `this.currentPage`

In many steps you'll see a usage of `this.currentPage`. This global variable is available in every step that was
preceded by either `I visit the "$pageName" page`, `the "$pageName" page is displayed` or `I am logged in as a "$user"`.

It will contain current page object and is required by any step.


### `this.currentUser`

This variable is set during `I am logged in as a "$user"` step. It will contain current user account -
it's email and password.

### `this.variableStore`

Key value store, for storing elements values required in a different steps than a current one.

##2. Regex and matchers

A lot of steps requires a `regex` or `matcher function` to check if an item has a required value.
For example if we wish to check if a text inside the selector contains only number, we can use a regular expression
`[0-9]+`.

Our framework has a build-in support for expression. You can either use a one that is defined inside
`helpers/matchers/regexMatcher/regex.js` file or define your own.

To use you regex inside of a step that supports it, simple pass `r:THE-NAME-OF-YOUR-REGEX-FROM-REGEX-FILE`.

For more complicated cases where regex is not enough, you can use matcher instead. Matcher is a function that is called
the check if a object meets it's criteria.

We provider you with a 3 built-in matchers: `f:isPresent`, `f:isVisible` - to check if element is visibile or present,
and `regexMatcher` to handle all `r:*` cases.

We also provide integration with variable store `v:*` and exact text matcher `t:*`.

Text matcher allows you to match exact text. For example if you need to match text "Come on", you can write `t:Come on`.
This line will check if a value of element is exactly the same as the one after `t:`.

Variable store matcher, allows you to read a value stored in variable store. For example you can store a random generated
value inside of a `myVariable` variable, and then use text matcher to check if all elements has that value
with `t:v:myVariable`.

All matches are stored inside `helpers/matchers` directory. You can easly add a new one by creating a file inside a
`helper/matchers`.

Each matcher must implements two methods:

`isSatisfiedBy(prefix, name): boolean` - to check if a matcher supports given value,
`match(element, matcherName): boolean` - to check if element meets required criteria

If you wan to create your own matcher, check existing ones for know-how.

##3. Number expressions

If a step requires `$numberExpression` then instead of number you have to use one of the supported expressions. We do
support most of the `chai` number expressions:

`equal X` - to check if a number of elements is equal to X

`within X-Y` - to check if a number of elements is within X and Y

`at least X` - to check if there is at least X elements of given type

'above X' - to check if number of elements is higher than X

'below X' - to check if number of elements is lower than X

##4. Dictionaries

Sometimes we need to map a value visible for user, to a value required by application. For example, user see category

name called "My category", but in order to filter by it, we need to find option with value "category-1". In order to be

able to filter, we can use dictionaries.

Dictionary is a key value store where to a given key we save given value. In a example with category, we can create

dictionary called "categories":

```
{
    "My category": "category-1"
}
```

This dictionary should be created inside `helpers/dictionaries` directory, to be later available.

##5. Generators

Sometimes you need to generate random values of given type, in order to fill the form fields. This can be easily done

with generators.

Create a file inside `helpers/generators` dictionary, with a name of generator.

After that you can create random value by using:

`I generate random "email" as "userRandomEmail"`

where `email` is a name of a generator file, and `userRandomEmail` is a variable name that can be later

used to access our email value.

##6. Available steps

Steps are separated into two groups - `common` and `project-specific`.

Every step is described by sentence used in gherkin, required parameters and simple example.

### Common steps

#### Login steps - steps used for user log in

1. `I am logged in as a "$user"`

    **Requirements:**

    There have to be `main` and `login` page objects defined in `pages` directory

    **Parameters:**

    `$user` - a user type from `accounts` object (this object is available in `accounts.js` file inside `data` directory)

    **Result:**

    If logged in then the `this.currentPage` is set to `main` page, `this.currentUser` is set to account of user of given
    type.

    **Example:**

    `Given I am logged in as a "seeker"`

### Navigation steps - steps used for website navigation

1. `I visit the "$pageName" page`

    **Requirements:**

    The page object with a name `$pageName` have to be defined in `pages` directory

    **Parameters:**

    `$pageName` - the name of a page object we wish to visit

    **Result:**

    If page object with a name `$pageName` exists, the `this.currentPage` variable is set to that page object, and we
    should be on that page object url.

    **Example:**

    If we have a page object with a name `somePageObject.page.js` defined inside `pages` directory then:

    `Given I visit the "somePageObject" page`

2. `the "$pageName" page is displayed`    

    **Requirements:**

    The page object with a name `$pageName` have to be defined in `pages` directory.

    **Parameters:**

    `$pageName` - the name of a page object we wish to check if we are currently on

    **Result:**

    This step check if the current url is the same as the one specified in a page object of a page we expect to be on.
    If so, then the `this.currentPage` is set to that page object.

    **Example:**

    If we are on main page and wish to navigate to contact page by navigation tabs instead of `visit` step, then we can
    type:

    ```
    When I click the "contactTab" element
    Then the `contact` page is displayed
    ```       

#### Elements steps - steps used to check elements properties

1. `I click the "$element" on the first item of "$container" element`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$container` element must be defined in current page object, by `element.all(...)`.

    The selector for `$element` must be defined in current page object, by `by.css|xpath(...)`.

    **Parameters:**

    `$element` - the name of a selector that will be used to get child element of a `$container` element

    `$container` - the name of a selector that will be used as a parent for element we're going to click

    **Result:**

    If both container and child element exists and child element is clickable then we click on the first child of the
    `container` selector that matches `element` selector. After that we can move to next step.

    **Example:**

    If there is a table with a name `profiles` described by a selector `element.all(by.css('.profiles'))`, and
    we have a selector `button` defined by `by.css('.button')` then we can use:

    `When I click the 'button' on the first item of a 'profiles' element`

2. `the "$elementName" element is visible`

    **Requirements:**

    The `this.currentPage` must be set.

    The selector for `$element` must be defined in current page object.

    **Parameters:**

    `$elementName` - the name of a selector of which visibility we're going to check

    **Result:**

    If the element is visible then we move to next step.

    **Example:**

    If we have a selector `submitButton` in current page object, then we caa use:

    `Then the "submitButton" element is visible`     

3. `there are "$numberExpression" following elements for element "$element":`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$element` element must be defined in current page object, by `element.all(...)`.

    **Parameters:**

    `$numberExpression` - valid number expression (check number expression part of documentation to learn more)

    `$element` - the name of a selector that will be used as a parent for child elements specified inside a table node

    tableNode - this steps requires to specify additional parameters in a form of a table below step, for example:
    ```
    | element   | value         |
    | firstName | r:notEmpty    |
    | lastName  | f:lastName    |
    ```

    there have to be 2 columns `element` and `value`.

    `element` is a name of selector that will be used as a child of a `$element` container and must be defined
    by `by.css|xpath(...)`.

    `value` is a regular expression or a function matcher. To learn more abour regular expressions and matcher go to
    `Regular expressions and matchers` section of the documentation.

    **Result:**

    This step will check if every row of a `$element` meets required criteria (regex or matcher). If so
    then we can go to next step.

    **Example:**

    If we have a table:

    ```
    <table id="profiles">
        <tr class="row">
            <td class="first-name">John</td>
            <td class="last-name">Doe</td>
        </tr>
        <tr class="row">
            <td class="first-name">Jan</td>
            <td class="last-name">Kowalski</td>
        </tr>
    </table>
    ```

    then we can define selector `profiles` as `element.all(by.css('.profiles .row'))`, and child selectors - `firstName`
    and `lastName` as `by.css('.first-name')` and `by.css('.last-name`).

    We also have a regex called `r:name` defined as `[\\w+]`.

    Then we can use:

    ```
    Then there are "equal 2" following elements for element "profiles":
        | element   | value  |
        | firstName | r:name |
        | lastName  | r:name |
    ```

4. `'there is element "$element" with value "$value"`

    **Requirements:**

     The `this.currentPage` must be set.

     The `$element` element must be defined in current page object.

    **Parameters:**

     `$element` - the name of a selector that will be checked against a `$value` parameter

     `$value` - the name of a regex or matcher used to check value of element. To learn more abour regular expressions
     and matcher go to `Regular expressions and matchers` section of the documentation

    **Result:**

     If `$element` text meets `$value` requirements, then we can move to next step.

    **Example:**     

    If there is an element
    ```
    <p class="numbers">123456</p>
    ```

    and we have a selector `numbers` defined by `element(by.css('.numbers'))` and a regex `r:number` `[0-9]+` then
    we can use:

    `Then there is element "numbers" with a value "r:number"` to check if a text inside a element contains only numbers

5. `there are "$numberExpression" "$elementName" elements`

     **Requirements:**

     The `this.currentPage` must be set.

     The `$element` element must be defined in current page object.

     **Parameters:**

     `$element` - the name of a selector which count will be checked against a `$numberExpression` parameter

     `$numberExpression` - valid number expression. To learn more check `Number expressions`
     section of the documentation.

     **Result:**

     If the number of elements described by selector `$element` is matching `$numberExpression` then we can go to next
     step.

     **Example:**

     If there is a `15 - 20` rows inside the table with a class `.profiles` described by selector `profiles` as
     `element.all(by.css('.profiles tr'))`, then we can use:

     `Then there are "within 15-20" "profiles" elements`

     to check if the number of profiles is between 15 and 20.

6. `the number of "$firstElement" elements is the same as the number of "$secondElement" elements`

     **Requirements:**

     The `this.currentPage` must be set.

     The `$firstElement` element must be defined in current page object by `element.all(...)`.

     The `$secondElement` element must be defined in current page object by `element.all(...)`.

    **Parameters:**

    `$firstElement` - the name of a selector of a first element used in comparison

    `$secondElement` - the name of a selector of a second element used in comparison

    **Result:**

    If number of elements is the same for both `$firstElement` and `$secondElement` then we can go to next step.

    **Example:**

    If we have a table, in which each row has a status class:

    ```
    <table class="profiles">
        <tr class="pending"></tr>
        <tr class="pending"></tr>
        <tr class="rejected"></tr>
        <tr class="accepted"></tr>
        <tr class="pending"></tr>
        <tr class="pending"></tr>
    </table>
    ```

    `profiles` selector is defined as `element.all(by.css('.profiles tr'))` - all visible rows in profiles table

    `rejectedProfiles` selector is defined as `element.all(by.css('.profiles tr.rejected'))` - all pending profiles

    We also have a button `showRejected` to show only `rejected` rows. Then we can use:

    ```
    When I click the "showRejected" element
    Then the number of "profiles" elements is the same as the number of "rejectedProfiles" elements`
    ```

    to check if `showRejected` button leaves only rows with a `pending` class

7. `the "$elementName" element is present`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$elementName` element must be defined.

    **Parameters:**

    `$elementaName` - the name of checked selector

    **Result:**

    If element is present on current page (this doesn't necessary mean it is visible), then we move to next step.

    **Example:**

    `Then the element "menu" is present`    

8. `the "$elementName" element is not present`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$elementName` element must be defined.

    **Parameters:**

    `$elementaName` - the name of checked selector

    **Result:**

    If element does not exists on current page, then we move to next step.

    **Example:**

    `Then the element "menu" is not present`  

9. `every "$containerName" element should have the same value for element "$elementName"`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$containerName` element must be defined by `element.all(...)`.

    The `$elementName` element must be defined by `by.css|xpath(...)`.

    **Parameters:**

    `$containerName` - name of a selector for container

    `$elementName` - name of a selector for a value, to be checked in container

    **Result:**

    If every element value, match the expected value, we move to next step.

    **Example:**

    Given we have a table:

    ```
    <table>
        <tr class="row">
            <td>John></td>
            <td class="lastname">Doe</td>
        </tr>
        <tr class="row">
            <td>John></td>
            <td class="lastname">Doe</td>
        </tr>
        <tr class="row">
             <td>John></td>
             <td class="lastname">Doe</td>
         </tr>       
    </table>
    ```

    the `container` is defined as `element.all(by.css(".row"))`,

    the `myElement` is defined as `by.css("td.lastname")`

    then we can use:

    `Then every "container" element should have the same value for element "myElement"`

    to check if each row has the same value for lastname.

10. `every "$containerName" element should have the same value for element "$elementName" attribute "$attributeName"`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$containerName` element must be defined by `element.all(...)`.

    The `$elementName` element must be defined by `by.css|xpath(...)`.

    The `$attributeName` attribute should be defined in page object by `$attributeName + Attribute`.

    **Parameters:**

    `$containerName` - name of a selector for container

    `$elementName` - name of a selector for a value, to be checked in container

    `$attributeName` - name of a attribute from element, used in comparison

    **Result:**

    If attribute of every element has the same value, we move to next step.

    **Example:**

    Given we have a table:

    ```
    <table>
        <tr class="row">
            <td>John></td>
            <td data-nationality="polish">Doe</td>
        </tr>
        <tr class="row">
            <td>John></td>
            <td data-nationality="polish">Doe</td>
        </tr>
        <tr class="row">
             <td>John></td>
             <td data-nationality="polish">Doe</td>
         </tr>       
    </table>
    ```

    the `container` is defined as `element.all(by.css(".row"))`,

    the `myElement` is defined as `by.css("td.lastname")`

    the `nationalityAttribute` is defines as `data-nationality`

    then we can use:

    `Then every "container" element should have the same value for element "myElement" attribute "nationality"`

    to check if each row has the same value for attribute `data-nationality`.

11. `I click the "$elementName" element`

    **Requirements:**

    The selector for element `$elementName` must be defined in `this.currentPage` page object. The `this.currentPage`
    must be set.

    **Parameters:**

    `$elementName` - the name of a selector we wish to click

    **Result:**

    If the click is successful then we move to next step.

    **Example:**

    If we have a selector with a name `contactTab`, then we can use this step as so:

    `When I click the "contactTab" element`

12. `I store the "$element" element text as "$variable" variable`

    **Requirements:**

    The selector for `$element` must be defined

    **Parameters:**

    `$element` - the name of a selector with value to be stored

    `$variable` - the name under which value will be available

    **Result:**

    Value should be available under `$variable` key.

    **Example:**

    Given we have a element `name` with text `myName`. We want to remember it for later use in a different step.

    We can do this with:

    `When I store the "name" element text as "name" variable`

    The text is available under `name` variable.

13. `the "$popupName" popup appears`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$popupName` element must be defined.

    The `$popupName + CloseBtn` element must be defined.

    **Parameters:** ~

    **Result:**

    It checks if `$popupName` has appeared and clicks on `$popupName + CloseBtn`.

    **Example:**

    `Then the "confirmationPopup" popup appears`       

14. `the element "$element" should have an item with values:`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$element` element must be defined by `element.all(...)`

    **Parameters:**

    `$element` - container element name

    tableNode - this steps requires to specify additional parameters in a form of a table below step, for example:
      ```
      | element   | value         |
      | firstName | r:notEmpty    |
      | lastName  | f:lastName    |
      ```

      there have to be 2 columns `element` and `value`.

      `element` is a name of selector that will be used as a child of a `$element` container and must be defined
      by `by.css|xpath(...)`.

      `value` is a regular expression or a function matcher. To learn more abour regular expressions and matcher go to
      `Regular expressions and matchers` section of the documentation.

    **Result:**

    If there is at least one element matching required parameters, then we can move to next step.

    **Example:**

    Given there is a table:

    ```
    <table class="myTable">
        <tr>
            <td class="name">John</td>
            <td class="email">jonh@email.com</td>
        </tr>
        <tr>
            <td class="name">Tom</td>
            <td class="email">tom@email.com</td>
        </tr>
    </table>
    ```

    and we want to check if there is an element with name `John` and email `john@email.com`.   

    We can do this with:

    ```
    Then the element "users" should have an item with values:
      | element | value            |
      | name    | t:John           |
      | email   | t:john@email.com |
    ```

15. `the element "$element" should not have an item with values:`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$element` element must be defined by `element.all(...)`

    **Parameters:**

    `$element` - container element name

    tableNode - this steps requires to specify additional parameters in a form of a table below step, for example:
      ```
      | element   | value         |
      | firstName | r:notEmpty    |
      | lastName  | f:lastName    |
      ```

      there have to be 2 columns `element` and `value`.

      `element` is a name of selector that will be used as a child of a `$element` container and must be defined
      by `by.css|xpath(...)`.

      `value` is a regular expression or a function matcher. To learn more abour regular expressions and matcher go to
      `Regular expressions and matchers` section of the documentation.

    **Result:**

    If there is no element matching required parameters, then we can move to next step.

    **Example:**

    Given there is a table:

    ```
    <table class="myTable">
        <tr>
            <td class="name">John</td>
            <td class="email">jonh@email.com</td>
        </tr>
        <tr>
            <td class="name">Tom</td>
            <td class="email">tom@email.com</td>
        </tr>
    </table>
    ```

    and we want to check if there is no element with name `Tom` and email `tom@email.com`.   

    We can do this with:

    ```
    Then the element "users" should not have an item with values:
      | element | value            |
      | name    | t:Tom           |
      | email   | t:tom@email.com |
    ```

16. `the "$elementName" element is not visible`

    **Requirements:**

    The `this.currentPage` must be set.

    The selector for `$element` must be defined in current page object.

    **Parameters:**

    `$elementName` - the name of a selector of which visibility we're going to check

    **Result:**

    If the element is not visible then we move to next step.

    **Example:**

    If we have a hidden selector `submitButton` in current page object, then we can use:

    `Then the "submitButton" element is not visible`

17. `I click the "$elementName" element if it is visible`

    **Requirements:**

    The `this.currentPage` must be set.

    The selector for `$elementName` must be defined in current page object.

    **Parameters:**

    `$elementName` - the name of a selector of which visibility we're going to check

    **Result:**

    We click on element only if it is visible, otherwise we move to next step.

    **Example:**

    If we have a button that is visible only in some cases and we can't predict what case we are going to have (button
    visible or invisible), then we can use:

    `When I click the "buttonName" element if it is visible`

     to click on element, only if visible.

18. `I click the "$elementName" "$parameter" element`

    **Requirements:**

    The `this.currentPage` must be set.

    The selector for `$elementName` must be defined in current page object.

    **Parameters:**

    `$elementName` - the name of a selector to be clicked

    `$parameter` - parameter to be passed to selector function

    **Result:**

    We click on element that was selected using selector function.

    **Example:**

    Sometimes built-in selectors are not enough, for example when you want to create generic selector to return elements

    based on attribute value.

    Given we have html:

    ```
    <p ng-message="some-message">My message</p>
    <p ng-message="other-message">My other message</p>
    ```

    Instead of creating two selectors we can create one:

    ```
    selector: function(ngMessageValue) {
        return element(by.css(`p[ng-message="${ngMessageValue}"]`));
    }
    ```

    and use:

    `When I click the "selector" "some-message" element` or

    `When I click the "selector" "other-message" element`

    to click on those elements.

19. `I store the "$element" element text matched by "$matcher" as "$variable" variable`

    **Requirements:**

    The `this.currentPage` must be set.

    The selector for `$element` must be defined in current page object.

    The matcher `$matcher` must be defined.

     **Parameters:**

    `$element` - the name of a selector to be clicked

    `$matcher` - the name of a matcher to be used for matching

    `$variable` - the name of a variable under which matched value will be available for later use

    **Result**

    Matched text should be stored under `$variable` name. If we could not find matching text, step will fail.

    **Example:**

    Given we have a element with some ID inside of id, that later can be used to verify if we are on the view page for

    given element.

    ```
    <p id="myId">Some text with my id: ID-1234</p>
    ```

    this element is defined by selector

    ```
    idElement: element(by.css('p#myId'));
    ```

    and we have matcher with defined matching groups:

    ```
    idMatcher: 'Some text with my id: (ID-[\d+]+)'
    ```

    we can use:

    `When I store the "idElement" element text matched by "idMatcher" as "elementId" variable`

    to store `ID-1234` under `elementId` name.

20. `the "$elementName" element is disabled`

    **Requirements:**

    The `this.currentPage` must be set.

    The selector for `$elementName` must be defined in current page object.

    **Parameters:**

    `$elementName` - the name of a selector for element to be checked

    **Result:**

    If `disabled` attribute of `$elementName` is set to `disabled`, `true` or has value true, then we move to next step.

    **Example:**

    `Then the "myElement" element is disabled`

21. `there are following elements in table "$table":`

    **Requirements:**

    The `this.currentPage` must be set.

    The selector for `$table` must be defined in current page object.

    **Parameters:**

    `$table` - the name of a selector for table of which rows will be checked

    **Result:**

    If `$table` rows are the same as expected rows, then we move to next step.

    **Example:**

    Given there is a table:

    ```
    <table id="myTable">
        <tr>
            <td class="number">1</td>
            <td class="firstname">John</td>
            <td class="lastname">Doe</td>
        </tr>
        <tr>
            <td class="number">2</td>
            <td class="firstname">John</td>
            <td class="lastname">Kowalski</td>
        </tr>
        <tr>
            <td class="number">3</td>
            <td class="firstname">John</td>
            <td class="lastname">Nowak</td>
        </tr>
    </table>
    ```

    and we have selector for table:

    `table: element(by.css('table#myTable))`,

    and selectors for columns:

    `number: by.css('td.number')`,

    `firstname: by.css('td.firstname')`,

    `firstname: by.css('td.lastname')`,

    we can check if table is exactly the same as expected one by:

    ```
    Then there are following elements in table "table":
        | number | firstname | lastname |
        | 1      | John      | Doe      |
        | 2      | John      | Kowalski |
        | 3      | John      | Nowal    |
    ```

    the number of rows in step table must be the same as rows number in application, however you don't

    have to match every column. For example we can match only number column by:

    ```
    Then there are following elements in table "table":
        | number |
        | 1      |
        | 2      |
        | 3      |
    ```

22. `I wait for the "$elementName" element to disappear`

    **Requirements:**

    The `this.currentPage` must be set.

    The selector for `$elementName` must be defined in current page object.

    **Parameters:**

    `$elementName` - the name of a selector to be checked

    **Result:**

    If `$elementName` has disappeared, then we move to next step.

    **Example:**

    `When I wait for the "$elementName" element to disappear`

23. `I store table "$table" rows as "$variableName" with columns:`

    **Requirements:**

    The `this.currentPage` must be set.

    The selector for `$table` must be defined in current page object as `element.all(...)`.

    **Parameters:**

    `$table` - selector for table rows,

    `$variableName` - the name of the variable under which rows should be stored,

    tableNode - selectors for table columns to be saved for example:

    ```
    | firstname |
    | lastname  |
    | phone     |
    ```

    **Result:**

    It saves the every row with selected columns under `$variableName`. Data are stored in objects:

    ```
    [
        [
            'firstRowFirstColumnValue',
            'firstRowSecondColumnValue'
        ],
        [
            'secondRowFirstColumnValue',
            'secondRowSecondColumnValue'
        ]
    ]
    ```

    **Example:**

    Given there is a table:

    ```
    <table class="myTable">
        <tr>
            <td class="firstname">John</td>
            <td class="lastname">Doe</td>
            <td class="phone">123123</td>
        </tr>
        <tr>
            <td class="firstname">Tom</td>
            <td class="lastname">Kowalski</td>
            <td class="phone">123123</td>
        </tr>  
        <tr>
            <td class="firstname">Michael</td>
            <td class="lastname">Nowak</td>
            <td class="phone">123123</td>
        </tr>  
    </table>
    ```

    and we need to store every row `firstname` and `lastname`.

    First we need to have selectors:

    for rows - `rows: element.all(by.css('table.myTable tr))`

    for columns:

    `firstname: by.css('tr.firstname')`,

    `lastname: by.css('tr.lastname')`

    We can use:

    ```
    When I store table "rows" rows as "myTableRows" with columns:
        | firstname |
        | lastname  |
    ```

#### Generators steps - steps used to generate values

1. `I generate random "$generatorName" as "$variableName`

    **Requirements:**

    The `$generatorName` file must exist inside `helpers/generators` directory.

    **Parameters:**

    `$generatorName` - the name of a generator to be used to generate value

    `variableName` - the name of the variable under which, value will be available

    **Result:**

    It generates a value of with given generator and saves it under `$variableName` in variable store.

    **Example:**

    If you have a form with email file, which needs need to be unique. You can create a generator called `email` to
    create a random unique email and store it as `myEmail` in variable store with:

    `When I generate random "email" as "myEmail"`

    and later use it to fill form field by:

    ```
    And I fill the "myForm" form with:
      | email | t:v:myEmail |
    ```

#### Files steps - steps used to files operations

1. `the file "$filename" should be downloaded`

    **Requirements:** ~

    **Parameters:**

    `$filename` - exact name of a file that will be downloaded

    **Result:**

    If the file with given name is available in download directory, then we can move to next step.

    **Example:**

    If we have a download button defined by selector `download`, that will download a file with a name `report.pdf` then
    we can use:

    ```
    When I click the `download` element
    Then the file `report.pdf` should be downloaded
    ```

    to check if file was downloaded.

2. `the file "$filename" contains table data stored under "$variableName" variable`

    **Requirements:**

    THIS STEP WORKS WITH XLS ONLY

    `$filename` - file must be available in downloads directory,

    `$variableName` - there must be variable with `$variableName` in store

    **Parameters:**

    `$filename` - the name of file to be checked,

    `$variableName` - the name of variable that contains table data to be checked in file `$filename`

    **Result:**

    If every file row is found in table, then we move to next step.

    **Example:**

    `Then the file "myFile.xls" contains table data stored under "myTable" variable`

#### Email steps - steps to check if email has been sent

1. `the email has been sent and contains:`

    **Requirements:**

    The `this.currentUser` may be defined.

    You have to have set env variables for:

    `MAILTRAP_API_KEY` - your mailtrap api key,
    `MAILTRAP_INBOX_ID` - inbox id used by your project,
    `MAILTRAP_URL` - mailtrap endpoint url, for example `https://mailtrap.io/api/v1`

    **Parameters:**

    `tableNode` - table node with a set of matchers and filters for email, defined as:

    ```
    | filterName | matcher or empty value| optional column for file type | optional column for file size |

    ```

    available filters:

    `| currentUser | | | |` - check if email was sent to current logged email

    `| subject | r: or t: matcher to match title | | |` - check if email has given title

    `| file    | r: or t: matcher to match file name | r: or t: matcher to match file type | file size as number |` -

    check if file exists

    `| html_body | r: or t: matcher to find matching text inside a html body | | |` - check if html body contains a

    given text

    Other available filters similar to html_body:

    - `from_email`,

    - `from_name`,

    - `to_email`,

    - `to_name`,

    - `text_body`

    **Result:**

    If there is email matching all filters, then we can go to next step.

    **Example:**  

    If we know that our application is sending email with a title "Status email", then we can use:

    ```
    Then the email has been sent and contains:
        | subject     | t:Status email |
        | currentUser |                |  
    ```

    to check if an email was sent to current user.

    If we want to check if email was sent to a concrete email, then we can use:

    ```
    Then the email has been sent and contains:
        | subject     | t:Status email |
        | to_email    | some@email.com |  
    ```

    If we wish to check if there is a pdf attachment, then we can use:

    ```
    Then the email has been sent and contains:
        | subject     | t:Status email |       |     |
        | file        | t:pdf-file.pdf | t:pdf | 64  |       
    ```

#### Form steps - steps to fill forms

1. `I fill the "$formName" form with:`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$formName` element must be defined in current page object.

    **Parameters:**

    `$formName` - the name of the form to be filled
    table node - the table node with a field selector and expected value:

    ```
    | someField               | any-value       |
    | someCustomAngularSelect | value-to-select |
    ```

    we use an internal system to find what is the type of a specified field. For most cases you won't have to use any
    naming pattern, however if you wish to use `customAngularSelect` then the selector name must end
    with a `CustomAngularSelect`.

    For file fields, you have to provide a name of a file to be uploaded. That file has to be inside `data` directory.

    For select, radio and checkbox fields, if we can't find the one with exact match, we select the first on the list.

    **Result:**

    If every field was field, then we move to next step.

    **Example:**

    If we have a form `contactForm` with a fields `name` and `email`, then we can use:

    ```
    When I fill the "contactForm" form with:
      | name  | John Doe     |
      | email | my@email.com |
    ```

    to fill the form

2. `I fill the "$formName" form field "$field" with value from the element "$valueElementSelector"`

    **Requirements:**

    The `this.currentPage` must be set.

    The `$formName` element must be defined in current page object.

    The `$field` element must be defined in current page object.

    The `$valueElementSelector` element must be defined in current page object.

    **Parameters:**

    `$formName` - the name of the form to be filled

    `$field` - the name of the field selector, for field that must be filled

    `$valueElementSelector` - the name of the element selector from which we are going to copy value

    **Result:**

    If we copied value from `$valueElementSelector` into the `$field` then we can move to next step.

    **Example:**

    If there is the form `filterForm`, that contain a field `keyword`. Given there is a element `firstProfileName`
    of which value we are going to copy into the `keyword` field, then we can use:

    `I fill the "filterForm" form field "keyword" with value from the element "firstProfileName"`

    to fill the form with a name from the first profile.

3. `I fill the "$formName" form field "$field" with value from the element "$valueElementSelector"` translated by dictionary "$dictionaryName"    

    **Requirements:**

    The `this.currentPage` must be set.

    The `$formName` element must be defined in current page object.

    The `$field` element must be defined in current page object.

    The `$valueElementSelector` element must be defined in current page object.

    The `$dictionaryName` dictionary must be created

    **Parameters:**

    `$formName` - the name of the form to be filled

    `$field` - the name of the field selector, for field that must be filled

    `$valueElementSelector` - the name of the element selector from which we are going to copy value

    `$dictionaryName` - the name of dictionary to be used. To learn more bout dictionaries go to `Dictionaries` section.

    **Result:**

    If the value copied from `$valueElementSelector` can be translated by `$dictionaryName` dictionary, then after we
    fill the `$field` with it, we can move to next step.

    **Example:**

    If there is the form `filterForm`, that contain a field `keyword`. Given there is a element `firstProfileName`
    which value must be translated into a correct value for field `keyword`, we can use a dictionary to do this for us.

    `When I fill the "filterForm" form field "keyword" with value from the element "firstProfileName" translated by
    dictionary 'myDictionary'`.  

4.  `the "$formName" form is filled with:`

    **Requirements:**

    The `this.currentPage` must be set.

    **Parameters:**

    `$formName` - the name of the form to be checked

    **Result:**

    It checks if form was filled with a specified values.

    For file uploads you have to use `Uploaded` postfix and have defined element on which we can compare
    if the uploaded filename is the same as expected one.    

5. `the error messages should be displayed:`

    **Requirements:**

    The `this.currentPage` must be set.

    **Parameters:**

    table node - the table node with a field selector and expected value:

    ```
    | element              | errorMessage    |
    | validationMsg        | error-string    |
    ```

    `element` is a name of selector that will be used as a child of a `$element` container and must be defined
    by `by.css|xpath(...)`.
    `errorMessage` is a specific error message (`string`) which is displayed under the defined `element`.

    **Result:**

    If every defined field was available and checked, then we move to next step.

    **Example:**

    If we have an validation for `userPictureValidation` with an error message `Required field`, then we can use:

    ```
    Then the error messages should be displayed:
      | element                | errorMessage     |
      | userPictureValidation  | Required field   |
    ```

### Debug steps

1. `I wait for "$seconds" seconds`

    **Requirements:** ~

    **Parameters:**

    `$seconds` - number of seconds to wait

    **Result:**

    The execution of scenario will pause for a given number of seconds.

    **Example:**

    `Then I wait for "60" seconds`

2. `I pause`

    **Requirements:** ~

    **Parameters:** ~

    **Result:**

    The execution of scenario will pause until tester action. This does not work on CI.

    **Example:**

    `Then I pause`   

### A2F specific steps

1. `I am on the "$applicationType" submit application form`

    **Requirements:**

    The `main` page object must be defined.

    The `fundSeekerSubmitProfile` page object must be defined.

    The page object for the application form must be defined. The name must match a pattern
    `$applicationType + ApplicationSubmitForm`.

    The `main` page object must have `fundSeekerTab` element defined.

    The `fundSeekerSubmitProfile` page object must have a selector for a navigation button for given `$applicationType`.
    That selector must match a pattern `$applicationType + SubmitBtn`.

    Each application submit form page object must have `applicationForm` selector defined.

    **Parameters:**

    `$applicationType` - `mature` or `startup` for A2F, defines which application form we want to visit

    **Result:**

    This step is a shortcut to get to the application submit form. As a result `this.currentPage` is set to a given
    submit form.

    **Example:**

    `Given I am on the "mature" submit application form`

2.  `I fill the first step of "$applicationType" application submit form`

    `I fill the second step of "$applicationType" application submit form`

    `I fill the third step of "$applicationType" application submit form`

    `I fill the fourth step of "$applicationType" application submit form`

    Alias for a `I fill the "$applicationType + ApplicationSubmitForm" form with:`

    Check `I fill the "$formName" form with:` for more information.

3.  `the first step of "$applicationType" application submit form is filled with:`

    `the second step of "$applicationType" application submit form is filled with:`

    `the third step of "$applicationType" application submit form is filled with:`

    `the fourth step of "$applicationType" application submit form is filled with:`

    **Requirements:**

    The `$applicationType + ApplicationSubmitForm` page must be defined.

    **Parameters:**

    `$applicationType` - `mature` or `startup` for A2F, defines which application form we want to visit

    **Result:**

    It checks if form was filled with a specified values.

    For file uploads you have to use `Uploaded` postfix and have defined element on which we can compare
    if the uploaded filename is the same as expected one.

4.  `I accept the information popup`

    **Requirements:**

    The `this.currentPage` must be set.

    The `informationPopup` element must be defined inside of a application submit form page.

    The `accept` element must be defined inside of a application submit form page.

    The `acceptModalBtn` element must be defined inside of a application submit form page.

    **Parameters:** ~

    **Result:**

    It checks if `informationPopup` has appeared and confirms it.

    **Example:**

    `When I accept the information popup`

7. `the deal I viewed should have "$status" status`

    **Requirements:**

    The `this.currentPage` must be set to `myDeals`

    the `this.selectedDealUrl` must be set.

    The `$status` must be a valid deal status (`pending`, `underReview`, `interested`, `notInterested`)

    **Parameters:**

    `$status` - expected status of a selected deal

    **Result:**

    If we selected a deal, then we can check if it's current status is the one that we expect.

    **Example:**

    `Then the deal I viewed should have "$status" status`

8. `I select first "$status" profile`

    **Requirements:**

    The `this.currentPage` must be set to `adminPendingApplicationsPage`

    The `$status` must be a valid profile status (`pending`, `accepted`, `rejected`)

    **Parameters:**

    `$status` - status of the profile we want to select

    **Result:**

    It looks for a profile with a given status and go to it's details page. Selected profile number is available in
    `this.selectedProfileNumber` variable.

    **Example:**

    `When I select first "pending" profile`

9. `the selected application should not be visible in "$status" profiles`

    **Requirements:**

    The `this.currentPage` must be set to `adminPendingApplicationsPage`

    The `this.selectedProfileNumber` must be set.

    The `$status` must be a valid profile status (`pending`, `accepted`, `rejected`)

    **Parameters:**

    `$status` - previous status of a selected profile

    **Result:**     

    If the profile is not displayed in the tab that contains profiles with a previous status of selected profile,
    then we can go to next step.

    **Example:**

    `Then the selected application should not be visible in "pending" profiles`


10. `the selected application should be visible in "$status" profiles`

    **Requirements:**

    The `this.currentPage` must be set to `adminPendingApplicationsPage`

    The `this.selectedProfileNumber` must be set.

    The `$status` must be a valid profile status (`pending`, `accepted`, `rejected`)

    **Parameters:**

    `$status` - current status of a selected profile

    **Result:**     

    If the profile is displayed in the tab that contains profiles with a current status of selected profile,
    then we can go to next step.

    **Example:**

    `Then the selected application should be visible in "pending" profiles`

11. `I fill the "$formName" form with sector from first deal`

    **Requirements:**

    The `this.currentPage` must be set to `myDeals`

    The `$formName` element must be defined.

    The `$formName` must have sector field

    The `firstDealSector` must be defined for first deal sector.

    The `sectorAttribute` must be defined in `myDeals` page. The attribute in html should have a value matching

    the expected option value.

    **Parameters:**

    `$formName` - the selector for the form element

    **Result:**

    The option with value from `firstDealSector` `sectorAttribute` attribute should be selected.

    **Example:**

    `When I fill the "myForm" form with sector from first deal`

12. `I fill the "$formName" form field "$field" with year from the "$valueElementSelector"`

    **Requirements:**

    The `this.currentPage` must be set to `myDeals`

    The `$formName` must be defined

    The `$field` must be a year field for filter scenario

    The `$valueElementSelector` must be a date in format `DD.MM.YYYY`

    **Parameters:**

    `$formName` - the selector for the form element

    `$field` - the name of the field to be field with

    `$valueElementSelector` - selector that contains the date

    **Result:**

    It extracts a year for the given date and fill filter form with it. The value used for field is also stored in
    variable store under "filterSelectedYear" name.

    **Example:**

    Given there is a filter for `filterForm` with a field `year`. We have a table:

    ```
    <tr>
        <td class="date">13.12.2016</td>
    </tr>
    ```

    If we define element `firstItemDate` by `element.all(by.css('tr)).get(0).element(by.css('td.date'))`, then  we can
    fill `year` field with 2016 value by writing step:   

    `When I fill the 'filterForm' field 'year' with year from the 'firstItemDate'

13. `I fill the "$formName" form field "$field" with month from the "$valueElementSelector"`

    **Requirements:**

    The `this.currentPage` must be set to `myDeals`

    The `$formName` must be defined

    The `$field` must be a year field for filter scenario

    The `$valueElementSelector` must be a date in format `DD.MM.YYYY`

    **Parameters:**

    `$formName` - the selector for the form element

    `$field` - the name of the field to be field with

    `$valueElementSelector` - selector that contains the date

    **Result:**

    It extracts a month for the given date and fill filter form with it. The value used for field is also stored in
    variable store under "filterSelectedMonth" name.

    **Example:**

    Given there is a filter for `filterForm` with a field `month`. We have a table:

    ```
    <tr>
        <td class="date">13.12.2016</td>
    </tr>
    ```

    If we define element `firstItemDate` by `element.all(by.css('tr)).get(0).element(by.css('td.date'))`, then  we can
    fill `month` field with 12 value by writing step:   

    `When I fill the 'filterForm' field 'month' with month from the 'firstItemDate'   

14. `I fill the "$formName" form field "$field" with month from the "$valueElementSelector"`

    **Requirements:**

    The `this.currentPage` must be set to `myDeals`

    The `$formName` must be defined

    The `$field` must be a year field for filter scenario

    The `$valueElementSelector` must be a date in format `DD.MM.YYYY`

    **Parameters:**

    `$formName` - the selector for the form element

    `$field` - the name of the field to be field with

    `$valueElementSelector` - selector that contains the date

    **Result:**

    It extracts a month for the given date and fill filter form with it. The value used for field is also stored in
    variable store under "filterSelectedWeek" name.

    **Example:**

    Given there is a filter for `filterForm` with a field `week`. We have a table:

    ```
    <tr>
        <td class="date">13.12.2016</td>
    </tr>
    ```

    If we define element `firstItemDate` by `element.all(by.css('tr)).get(0).element(by.css('td.date'))`, then  we can
    fill `week` field with 2 value by writing step:   

    `When I fill the 'filterForm' field 'week' with week from the 'firstItemDate'        
