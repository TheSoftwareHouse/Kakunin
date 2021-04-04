## Store:

#### `storeTextAsVariable()`

Stores the text from element `:elementName` of this.currentPage under the `:variableName` so you can use it later.

```javascript
 methods.store.storeTextAsVariable(this.currentPage, elementName, variable);
```

*Example:*

```javascript
When(/^I store the "([^"]*)" element text as "([^"]*)" variable$/, function(elementName, variable) {
  return methods.store.storeTextAsVariable(this.currentPage, elementName, variable);
});
```

___
#### `updateStoredTextAsVariable()`

Updates the variable `:variableName` value by value from element `:elementName` of `this.currentPage`.

```javascript
 methods.store.updateStoredTextAsVariable(this.currentPage, elementName, variable);
```

*Example:*

```javascript
When(/^I update the "([^"]*)" element text as "([^"]*)" variable$/, function(elementName, variable) {
  return methods.store.updateStoredTextAsVariable(this.currentPage, elementName, variable);
});
```

___
#### `storeTextMatchedByAsVariable()`

# //TODO Add those step to the docs - not sure if regex

Stores the part of the element `:elementName` text, that matches the `:matchingRegex` under the `:variableName` for later use.

```javascript
methods.store.storeTextMatchedByAsVariable(this.currentPage, elementName, matcher, variable);
```

*Example:*

```javascript
When(/^I store the "([^"]*)" element text matched by "([^"]*)" as "([^"]*)" variable$/, function(
  elementName,
  matcher,
  variable
) {
  return methods.store.storeTextMatchedByAsVariable(this.currentPage, elementName, matcher, variable);
});
```

___
#### `storeTableRowsWithColumnsAsVariable()`

Allows to store a row specified columns from a table `:tableRow` and save it under `:variableName` as an array of objects.

```javascript
 methods.store.storeTableRowsWithColumnsAsVariable(this.currentPage, table, variableName, data);
```

*Example:*

```javascript
When(/^I store table "([^"]*)" rows as "([^"]*)" with columns:$/, function(table, variableName, data) {
  return methods.store.storeTableRowsWithColumnsAsVariable(this.currentPage, table, variableName, data);
});
```
