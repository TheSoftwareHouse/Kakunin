Matchers allows you to check if a element content matches your expectation.

For example you can check if a value has a specified pattern or if a button is clickable.

Using matcher is very straightforward, for example: `f:isClickable`.

Matchers can be used in most of the steps related to checking content (with exception of checking form values).

Kakunin comes with a set of built in matchers:

###Visibility matcher

`f:isVisible` - checks if element is visible (must be in viewport and cannot be hidden behind any other element)

###Invisibility matcher

`f:isNotVisible` - checks if element is not visible

###Present matcher

`f:isPresent` - checks if element is in html code (does not have to be visible)

###Clickable matcher

`f:isClickable` - checks if element is clickable

###Not clickable matcher

`f:isNotClickable` - checks if element is not clickable

###Attribute matcher

`attribute:attributeName:regexName` - allows to check if element has attribute with a name specified by `attributeName` and it has to 
have a format passing `regexName`

For example, if there is an element:

`<p custom-attribute="123123">some value</p>`

you can check if attribute is an number by running: `attribute:custom-attribute:number`

###Regex matcher

`r:regexName` - allows you to run a `regexName` against a text value of element

Regexes have to be specified inside `regex` directory or be a kakunin built ones:

`notEmpty` - there must be a value
`number` - must be a number

You can add your own matchers. In order to do so please read `Extending Kakunin` section.
