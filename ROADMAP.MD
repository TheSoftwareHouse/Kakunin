## Roadmap

### v2.1.0

* Allow to test REST endpoints against expected JSON Schema

### v2.0.0

* full support for Windows OS,

* we are going to drop the need for strict first row in gherkin tables. For example, instead of:
  ``` gherkin
    Given there are "at least 5" following elements for element "items":
    | element    | value       |
    | viewButton | f:isVisible | 
  ```
  
  you will be able to write it like this:
  
  ``` gherkin
    Given there are "at least 5" following elements for element "items":
    | viewButton | f:isVisible | 
  ```
  
  this change will be introduced to all tables related steps.  

* we are going to drop the need for defining `locators` instead of `selectors` for some table steps. For example:

  ``` gherkin
    Given there are "at least 5" following elements for element "items":
    | element    | value       |
    | viewButton | f:isVisible | 
  ```
    
  Currently the `viewButton` must be defined as `this.viewButtonLocator = by.css('.viewButton')`. In case you wish to click on such locator, you have to create a 
  selector for it - `this.viewButton = element(this.viewButtonLocator)`. 
  
  We are aware of code duplication issue here and after investigation this will be fixed in upcoming major version.
  
  From `v2.0.0` you'll be able to use `this.viewButton = element(by.css('.viewButton'))` (and even the `$()` shortcut) in every step.
