Transformers allow you to transform values passed to form steps.

For example a select requires to pass a value `/options/1b30f17e-e445-4d28-a30c-dedad95829ab`. This one is quite unreadable, but with the help of transformers you are
able to write it like this: `d:options:someOptionName`.

In real-life example it will look similar to:

``` 
I fill the "myForm" form with:
  | inputElement    | d:someDictionary:someKey            |
  | textareaElement | g:someGenerator                     |
  | radioElement    | v:someVariableName                  |
  | checkboxElement | standard value                      |
```

There are 3 types of built-in transformers:

###Dictionaries

Dictionaries allows you to transform a value A to value B using a simple key->value transformation.

You can run a dictionary transformer by providing dictionary prefix `d:`, specifying the dictionary name and key that should be used as a value provider. For example:

`d:myDictionaryName:myDictionaryKey`

this example assumes that there is a dictionary that supports name `myDictionaryName` and it has `myDictionarKey` key.

You can read about dictionaries in `Extending Kakunin` section.

###Generators

Generators allows you to generate a value by using a specified generator.

This can be done by: `g:generatorName`.

If a generator supports parameters then you can specify them by:

`g:generatorName:param1:param2:...:paramN`

You can read more about generators in `Extending Kakunin` section.

###Variable store

Variable store allows you to fill the form with a value that was saved in previous steps of current running scenario.

This can be done by:

`v:variableName`

You can read more about variable store in `Extending Kakunin` section
