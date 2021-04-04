## Checkers:

#### `checkNumberOfElements()`

Allows to check if a number of `:elementName` elements is the same as we expect.

```javascript
methods.checkers.checkNumberOfElements(this.currentPage, numberExpression, element);
```

*Example:*

```javascript
Then(/^there are "([^"]*)" "([^"]*)" elements$/, function(numberExpression, element) {
  return methods.checkers.checkNumberOfElements(this.currentPage, numberExpression, element);
});
```

---
#### `checkIfElementContainsChildElementsMatchingMatchers()`

# //TODO Add those step to the docs

```javascript
methods.checkers.checkIfElementContainsChildElementsMatchingMatchers(this.currentPage, elementName, data);
```

*Example:*

```javascript
Then(/^there are elements for element "([^"]*)":$/, function(elementName, data) {
  return methods.checkers.checkIfElementContainsChildElementsMatchingMatchers(this.currentPage, elementName, data);
});
```

---
#### `checkIfElementContainsValue()`

Allows to check if there is or there is no `:elementName` that matches the `:matcher.`

```javascript
methods.checkers.checkIfElementContainsValue(this.currentPage, assert, elementName, value);
```

*Example:*

```javascript
Then(/^there (is|is no) element "([^"]*)" with value "([^"]*)"$/, function(assert, elementName, value) {
  return methods.checkers.checkIfElementContainsValue(this.currentPage, assert, elementName, value);
});
```

---
#### `checkIfElementMatchesRegex()`


Allows to check if `:elementName` matches given type of regex.

or

Allows to check if `:elementName` is not matching given type of regex.


```javascript
methods.checkers.checkIfElementMatchesRegex(this.currentPage, assert, elementName, matcher);
```

*Example:*

```javascript
Then(/^there (is|is no) element "([^"]*)" with "([^"]*)" regex$/, function(assert, elementName, matcher) {
  return methods.checkers.checkIfElementMatchesRegex(this.currentPage, assert, elementName, matcher);
});

```

---
#### `checkIfElementMatchesMatcher()`

Allows to check if `:elementName` matches the given type of `:matcher`. 

or

Allows to check if `:elementName` is not matching the given type of `:matcher`.

```javascript
methods.checkers.checkIfElementMatchesMatcher(this.currentPage, assert, elementName, matcher);
```

*Example:*

```javascript
Then(/^there (is|is no) element "([^"]*)" matching "([^"]*)" matcher$/, function(assert, elementName, matcher) {
  return methods.checkers.checkIfElementMatchesMatcher(this.currentPage, assert, elementName, matcher);
});
```

---
#### `checkIfElementContainsText()`

Allows to check if `:elementName` contains a text that matches the `:matcher`.

or

Allows to check if `:elementName` doesn't contain a text that matches the `:matcher`.

```javascript
methods.checkers.checkIfElementContainsText(this.currentPage, assert, elementName, value);
```

*Example:*

```javascript
Then(/^there (is|is no) element "([^"]*)" containing "([^"]*)" text$/, function(assert, elementName, value) {
  return methods.checkers.checkIfElementContainsText(this.currentPage, assert, elementName, value);
});
```

---
#### `checkIfTableContainsElements()`

Allows to check if a child elements of `:elementName` have a specified content.

```javascript
  methods.checkers.checkIfTableContainsElements(this.currentPage, table, data);
```

*Example:*

```javascript
Then(/^there are following elements in table "([^"]*)":$/, function(table, data) {
  return methods.checkers.checkIfTableContainsElements(this.currentPage, table, data);
});
```

---
#### `checkIfTableElementContainsMatchingNumberOfElements()`

Allows to check if a child elements of `:elementName` have a specified content.

```javascript
methods.checkers.checkIfTableElementContainsMatchingNumberOfElements(
    this.currentPage,
    numberExpression,
    elementName,
    data
  );
```

*Example:*

```javascript
Then(/^there are "([^"]*)" following elements for element "([^"]*)":$/, function(numberExpression, elementName, data) {
  return methods.checkers.checkIfTableElementContainsMatchingNumberOfElements(
    this.currentPage,
    numberExpression,
    elementName,
    data
  );
});
```

---
#### `checkIfAllElementsHaveMatchingValues()`

Allows to check if every row defined by `:elementName` has the same value for a column `:columnElementName`.

```javascript
 methods.checkers.checkIfAllElementsHaveMatchingValues(this.currentPage, containerName, elementName)
```

*Example:*

```javascript
Then(/^every "([^"]*)" element should have the same value for element "([^"]*)"$/, function(
  containerName,
  elementName
) {
  return methods.checkers.checkIfAllElementsHaveMatchingValues(this.currentPage, containerName, elementName);
});
```

---
#### `checkIfElementHaveItemsWithValue()`

Allows to check if any of the child elements of `:elementName` have a specified content (one matching element is enough).

or

Allows to check if the child elements of `:elementName` have a different content than that given in the table.

```javascript
methods.checkers.checkIfElementHaveItemsWithValue(this.currentPage, elementName, assertion, data);
```

*Example:*

```javascript
Then(/^the element "([^"]*)" should (have|not have) an item with values:$/, function(elementName, assertion, data) {
  return methods.checkers.checkIfElementHaveItemsWithValue(this.currentPage, elementName, assertion, data);
});
```

---