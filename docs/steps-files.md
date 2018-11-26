---
id: steps-files
title: Files
---


# Steps used to interact with files:
## `the file ":fileName" should be downloaded`

Checks if a file with name `:fileName` was downloaded.

This step does not support matchers or regular expressions, so the name must be exact match. However you can use
variable store here.

Let's assume there is a variable `myFile` with a value `super-file` in variable store.

You can write `the file "v:myFile.zip" should be downloaded` to check if a file `super-file.zip` was downloaded.

---

## `the file ":fileName" contains table data stored under ":variableName" variable`

This step allows you to compare an xls/xlsx file `:fileName` with an existing data stored under `:variableName` variable.

The data under `:variableName` must be an array of objects representing each row of file.

---
