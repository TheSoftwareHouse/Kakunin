## Navigation:

# //TODO Add those step to the docs

#### `switchWindow()`

Used to switch to the specific `tab` in browser window. 

```javascript
methods.navigation.switchWindow(tabNumber);
```

*Example:*

```javascript
When(/^I switch to window number "([^"]*)" of a browser$/, tabNumber => {
  return methods.navigation.switchWindow(tabNumber);
});
```
___
#### `closeCurrentWindow()`

Used to close to the specific `tab` in browser window. 

```javascript
methods.navigation.closeCurrentWindow();
```

*Example:*

```javascript
When(/^I close the current browser tab$/, () => {
  return methods.navigation.closeCurrentWindow();
});

```
---