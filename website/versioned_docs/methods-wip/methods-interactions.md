## Interactions:


#### `click()`

Performs a click action on element `:elementName` from `this.currentPage`.

The child element must be specified by `:elementName` and must be available in `this.currentPage`.

```javascript
methods.interactions.click(this.currentPage,elementName)
```

*Example:*

```javascript
When(/^I click the "([^"]*)" element$/, function(elementName) {
  return methods.interactions.click(this.currentPage, elementName);
}); 
```

---
#### `infinityScrollTo()`

I infinitely scroll to the `:elementName` element.

Allows to scroll till `:elementName` is visible. Useful for infinite scrolling functionality.

```javascript
methods.interactions.infinityScrollTo(this.currentPage,elementName)
```

*Example:*

```javascript
When(/^I infinitely scroll to the "([^"]*)" element$/, function(elementName) {
  return methods.interactions.infinityScrollTo(this.currentPage, elementName);
  });
```

---
#### `pressKey()`

Performs a key press operation on `:keyName` key.

```javascript
methods.interactions.pressKey(key)
```

*Example:*

```javascript
When(/^I press the "([^"]*)" key$/, key => {
  return methods.interactions.pressKey(key);
});
```

---
#### `pressKeyOnElement()`

Performs a key press operation on `:keyName` key on specific `elementName`.

```javascript
methods.interactions.pressKeyOnElement(this.currentPage, key, 
```

*Example:*

```javascript
When(/^I press the "([^"]*)" key on the "([^"]*)" element$/, function(key, elementName) {
  return methods.interactions.pressKeyOnElement(this.currentPage, key, elementName);
});
```

---
#### `dragAndDrop()`

Clicks on `:elementDrag` and moves it onto `:elementDrop` while left mouse button is pressed, and then release it.

Note: This is not working on HTML5!

```javascript
methods.interactions.dragAndDrop(this.currentPage, elementDrag, elementDrop);
```

*Example:*

```javascript
When(/^I drag "([^"]*)" element and drop over "([^"]*)" element$/, function(elementDrag, elementDrop) {
  return methods.interactions.dragAndDrop(this.currentPage, elementDrag, elementDrop);
});
```

---
#### `confirmRecaptcha()`

Used to confirm recaptcha v2 on current page.

You must specify the iframe selector in which the recaptcha is located. After confirming recaptcha, Kakunin will return to the default content (frame).

```javascript
methods.interactions.confirmRecaptcha(this.currentPage, elementName);
```

*Example:*

```javascript
When(/^I confirm the recaptcha in "([^"]*)" iframe$/, function(elementName) {
  return methods.interactions.confirmRecaptcha(this.currentPage, elementName);
});
```

---