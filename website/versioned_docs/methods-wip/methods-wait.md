## Wait:

#### `waitForElementCondition()`

Waits till element `:elementName` from `this.currentPage` meets criteria specified by `:expectedConditionName`.

You can use any of the Protractor's expected condition:

- `visibilityOf`
- `invisibilityOf`
- etc.

Read more in [Protractor's API documentation](https://www.protractortest.org/#/api?view=ProtractorExpectedConditions).

```javascript
methods.wait.waitForElementCondition(this.currentPage, condition, elementName);
```

*Example:*

```javascript
When(/^I wait for "([^"]*)" of the "([^"]*)" element$/, function(condition, elementName) {
  return methods.wait.waitForElementCondition(this.currentPage, condition, elementName);
});
```

___
#### `waitForElementDisappear()`

Waits till element `:elementName` disappears.

```javascript
 methods.wait.waitForElementDisappear(this.currentPage, elementName, sync);
```

*Example:*

```javascript
When(/^I wait for the "([^"]*)" element to disappear$/, function(elementName, sync) {
  methods.wait.waitForElementDisappear(this.currentPage, elementName, sync);
});
```

---