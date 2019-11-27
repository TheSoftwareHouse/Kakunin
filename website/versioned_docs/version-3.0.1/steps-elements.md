---
id: version-3.0.1-steps-elements
title: Elements
original_id: steps-elements
---

# Steps used to interact with elements:
## `I infinitely scroll to the ":elementName" element`

Allows to scroll through infinite scroll mechanism.

The `:elementName` is a name of a selector for loading trigger.

---

## `I wait for ":expectedConditionName" of the ":elementName" element`

Waits till element `:elementName` from `this.currentPage` meets criteria specified by `:expectedConditionName`.

You can use any of the Protractor's expected condition:

* `visibilityOf`
* `invisibilityOf`

etc.

Read more in Protractor's API documentation.

---

## `I wait for the ":elementName" element to disappear`

Waits till element `:elementName` disappears.

---

## `I scroll to the ":elementName" element`

Scrolls to element `:elementName` of `this.currentPage`. The element will be on bottom of the page.

---

## `I infinitely scroll to the ":elementName" element`

Allows to scroll till `:elementName` is visible. Useful for infinite scrolling functionality.

---

## `I press the ":keyName" key`

Performs a key press operation on `:keyName` key.

---

## `I click the ":elementName" element`

Performs a click action on element `:elementName` from `this.currentPage'

The child element must be specified by `:elementName` and must be available in `this.currentPage`.

---

## `I store the ":elementName" element text as ":variableName" variable`

Stores the text from element `:elementName` of `this.currentPage` under the `:variableName` so you can use it later.

---

## `I update the ":elementName" element text as ":variableName" variable`

Updates the variable `:variableName` value by value from element `:elementName` of `this.currentPage`.

---

## `I store the ":elementName" element text matched by ":matchingRegex" as ":variableName" variable`

Stores the part of the element `:elementName` text, that matches the `:matchingRegex` under the `:variableName` for later use.

---
## `the ":elementName"" element is visible`

Checks if element `:elementName` is visible and clickable

---

## `the ":elementName"" element is not visible`

Checks if element `:elementName` is available in HTML DOM but is not visible and clickable

---

## `the ":elementName" element is disabled`

Checks if element is disabled

---

## `I store table ":tableRow" rows as ":variableName" with columns:`

Allows to store a row specified columns from a table `:tableRow` and save it under `:variableName` as an array of objects.

This step requires a table of columns elements, for example:

```gherkin
I store table "someRow" rows as "someVariable" with columns:
  | firstName |
  | lastName  |
  | id        |
```

In order to make it work there must be not only array element `this.someRow = $$('.rows')` in `this.currentPage`, but also
element `this.firstName = $('.firstName');` and so on.

The result of this step is an array of:

```javascript
[
  [
    'firsRowFirstNameValue',
    'firsRowLastNameValue'
    'firsRowIdValue'
  ]
  ...
]
```

---

## `there are following elements in table ":elementName":`

Allows to check if a child elements of `:elementName` have a specified content.

This steps allows you to specify an array of child elements that will be checked against expected values.

For example:

```gherkin
there are following elements in table "myTable":
  | id  | firstName | lastName |
  | t:1 | t:Adam    | t:Doe    |
  | t:2 | t:John    | t:Doe    |
```

First row must specify columns elements. Starting from second row we must provide a matchers for each row that must be displayed.

This step checks exact match, so if the table has 5 rows, there must be a 5 rows in this table.

We can specify only a set of columns (for example if a table has 5 columns, we can specify only 1).

---

## `there are "numberExpression" following elements for element ":elementName":`

Allows to check if a child elements of `:elementName` have a specified content. Element should be an array, for example:

```html
<table>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>2</td>
  </tr>
</table>
```

for this case the `:elementName` should be specified as `$$('table tr')`.

Allows to check if a number of elements is the one that we expect.

`numberExpression` is a supported expression from `chai.js` library:

* `equal N` where N is a number

* `at least N` where N is a number

* `above N` where N is a number

* `below N` where N is a number

* `within N M` where N and M are a numbers

and so on. You can check expressions on `chai.js` API dock for BDD.

This step requires an array of elements to be checked. For example:

```gherkin
there are "equal 5" following elements for element "myList":
  | viewButton | f:isClickable |
  | id         | r:idRegex     |
```

The child elements must be an elements, for example `this.viewButton = $('button.viewButton');`.

You can use all kind of matchers here.

---

## `there are ":elementName" dropdown list elements with following options:`

Allows to check if there is exact match to options provided in table for option selector. 
```html
<select name="list" id="personlist">
  <option value="1">Person 1</option>
  <option value="2">Person 2</option>
  <option value="3">Person 3</option>
  <option value="4">Person 4</option>
</select>
```
For example:

```gherkin
there are "personOption" dropdown list elements with following options:
  | Person 1      |
  | Person 2      |
  | Person 3      |
  | Person 4      |
```
The element must be for example:  
`this.personOption = this.personForm.$$('option');`.

---

## `there is element ":elementName" with value ":matcher"`

Allows to check if `:elementName` has a value that matches the `:matcher`.

---

## `there is element ":elementName" containing ":matcher" text`

Allows to check if `:elementName` contains a text that matches the `:matcher`.

---

## `there is element ":elementName" matching ":matcher" matcher`

Allows to check if `:elementName` matches the given type of `:matcher`. For example:

```gherkin
there is element "button" matching "isClickable" matcher
```

---

## `there is element ":elementName" with regex ":matcher"`

Allows to check if `:elementName` matches given type of regex. For example:

```gherkin
there is element "input" with regex "notEmpty"
```

---

## `there is no element ":elementName" with value ":matcherName"`

Allows to check if there is no `:elementName` that matches the `:matcher`.

---

## `there is no element ":elementName" containing ":matcher" text`

Allows to check if `:elementName` doesn't contain a text that matches the `:matcher`.

---

## `there is no element ":elementName" matching ":matcher" matcher`

Allows to check if `:elementName` is not matching the given type of `:matcher`.

---

## `there is no element ":elementName" with regex ":matcher"`

Allows to check if `:elementName` is not matching given type of regex.

---

## `there are "numberExpression" ":elementName" elements`

Allows to check if a number of `:elementName` elements is the same as we expect.

`numberExpression` is a supported expression from `chai.js` library:

* `equal N` where N is a number

* `at least N` where N is a number

* `above N` where N is a number

* `below N` where N is a number

* `within N M` where N and M are a numbers

and so on. You can check expressions on `chai.js` API dock for BDD.

`:elementName` should be specified as an array, for example:

```html
<table>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>2</td>
  </tr>
</table>
```

for this case the `:elementName` should be specified as `$$('table tr')`.

---

## `every ":elementName" element should have the same value for element ":columnElementName"`

Allows to check if every row defined by `:elementName` has the same value for a column `:columnElementName`.

`:elementName` must be an array of elements

`:columnElementName` must be an element, for example:

```html
<table>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>1</td>
  </tr>
</table>
```

for this case the `:elementName` should be specified as `$$('table tr')` and we can specify column element
`this.myColumn = $('td');`. This allows us to write:

`every "myElement" element should have the same value for element "myColumn"`

---

## `the element ":elementName" should have an item with values:`

Allows to check if any of the child elements of `:elementName` have a specified content (one matching element is enough). Element should be an array, for example:

```html
<table>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>2</td>
  </tr>
</table>
```

for this case the `:elementName` should be specified as `$$('table tr')`.

This step requires an array of elements to be checked. For example:

```gherkin
the element "myList" should have an item with values:
  | id | t:1 |
```

The child elements must be an elements, for example `this.id = $('td');`.

You can use all kind of matchers here.

---

## `the element ":elementName" should not have an item with values:`

Allows to check if the child elements of `:elementName` have a different content than that given in the table. Element should be an array, for example:

```html
<table>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>2</td>
  </tr>
</table>
```

for this case the `:elementName` should be specified as `$$('table tr')`.

This step requires an array of elements to be checked. For example:

```gherkin
the element "myList" should have an item with values:
  | id | t:does-not-exist |
```

The child elements must be an elements, for example `this.id = $('td');`.

You can use all kind of matchers here.

---

## `I drag ":elementDrag" element and drop over ":elementDrop" element`

Clicks on `:elementDrag` and moves it onto `:elementDrop` while left mouse button is pressed, and then release it.

Note: This step is not working on HTML5!

---
