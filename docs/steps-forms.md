---
id: steps-forms
title: Forms
---

# Steps used to fill forms:

## `I fill the ":formName" form with:`

Allows to fill the form with the name `:formName` and values provided as an array of inputs and values. The element with name `:formName` must be defined inside the
`currentPage` page object.

Input and values should be provided as an array for example:

```gherkin
I fill the "myForm" form with:
  | inputElement    | value to be typed into field        |
  | textareaElement | value to be typed into textarea     |
  | radioElement    | radio value to be selected          |
  | checkboxElement | checkbox label value to be selected |
```

By default we support all basic HTML field types (text inputs, checkboxes, radios, selects, files and textareas)

In order to use the default handlers the elements you use as input must follow pattern:

For inputs:

`this.element = $('input')` - element should point at input you want to fill

For textareas:

`this.element = $('textarea')` - element should point at textarea you want to fill

For file input:

`this.element = $('input')` - element should point at input you want to fill and value should a filename of file from `data` directory

For selects:

`this.element = $('select')` - element should point at select and value should be an value of expected option

For radios:

`this.element = $$('radio[name="name-of-radio"]')` - element should be an array of all radio input of given name and value should be an value of radio you wish to select

For checkboxes:

Checkbox should have a html like:

```html
<label>
  My checkbox
  <input type="checkbox" name="some-name"/>
</label>
```

`this.element = $$('checkbox[name="name-of-radio"]')` - element should be an array of all checkboxes of given name and value should be a text from label of checkbox you want to fill

You can use all kind of transformers to as a values for fields.

---

## `the ":formName" form is filled with:`

The same as `I fill the ":formName" form with:` but allows to check if a form is filled with a given set of values.

You can use all kind of transformers to as a expected values for fields.

The only difference is for file fields. You cannot check uploaded files just like that, however we prepared a special type of handler
that allow to check for some information related to a specific file.

Let's assume that after upload we display an information with a file name of a uploaded file.

You can use a special handler that requires to set a element with a postfix `Uploaded`. This will check if a value of that element is the same as you expected.

For example you can write a step like this:

```gherkin
the "myform" form is filled with:
  | myFileUploaded | file.txt |
```

Keep in mind that the element name must end with `Uploaded` for example:

`this.myFileUploaded = $('p.some-file')`

---

## `the error messages should be displayed:`

Allows you to specify the error messages that should be displayed for a specific elements.

This step requires an array of format:

```gherkin
the error messages should be displayed:
  | myElement | my error message |
```

You can use dictionaries in this step as follows:

```gherkin
the error messages should be displayed:
  | myElement | d:dictionaryName:dictionaryKey |
```

---
