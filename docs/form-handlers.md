---
id: form-handlers
title: Form Handlers
---

Form handlers allows you to fill or check if a element is filled with certain type of data.

For example you can fill select out of the box just by providing element and option.

Using form handlers is very straightforward.
By providing element, option and type of field for example:

```gherkin
When I fill the "form" form with:
            | nameInput           | Mike Ross       | text     |
            | descriptionTextarea | He is a lawyer  | text     |
```

or with automatic field detection for example:

```gherkin
When I fill the "form" form with:
            | descriptionTextarea | g:personalData:email |
```

also you can use form handlers to check if correct value is set:

```gherkin
Then the "form" form is filled with:
            | descriptionTextarea | v:storedTextareaValue |
```


Kakunin comes with a set of built in form handlers:

## Text handler

`text` - fills input

## File Handler

`file` - adds file, by providing file name (file must be in data folder)

## CKEditor Handler

`CKEditor` - fills CKEditor field, with text

## Radio Handler

`radio` - clicks desired radio option 

## Select Handler

`select` - picks desired option from select

## Checkbox Handler

`checkbox` - clicks desired checkbox option

## Uploaded File Handler

`uploadedFile` - this allows you to check if file is uploaded (this handler is only for checking)

## Custom Handlers

We allows you to write your own handler, just by following
form handlers interface

## Methods:

##### `isSatisfiedBy(element, elementName)`
- this method is used to check if fill form step should use this strategy to for example to fill or select proper option

##### `handleFill(page, elementName, desiredValue)`
- this method should contain a way of filling desired field e.g select proper option from custom Angular select

##### `handleCheck(page, elementName, desiredValue)`
- this method should contain a way of checking field e.g is field filled with provided text

##### `getPriority()` 
 - this method is used in automatioc field detection, higher value means 
 isSatisifedBy method will be later

## Example:
```javascript
const { handlers } = require('kakunin');

class CustomHandler {
  constructor() {
    this.type = 'custom-handler-type';
  }

  isSatisfiedBy(element, elementName) {
  }

  handleFill(page, elementName, desiredValue) {
    
  }

  handleCheck(page, elementName, desiredValue) {
    
  }

  getPriority() {
    return 998;
  }
}

handlers.addHandler(new CustomHandler());
```
