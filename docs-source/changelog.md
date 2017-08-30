##### v1.16.3

- changed `There are "equal 4" following elements for element "rows":` error message to be more descriptive
- added express app to handle form submit tests
- added tests form html default field types and tabular content validation

##### v1.16.2

- added new step `I visit the "pageName" page with parameters:` which replaces wildcards with a values given in the table
- fixed step `I wait for "condition" of the "element" element`, currently timeout is set properly to `elementsVisibilityTimeout` key which is placed in kakunin.config.js 
- improved step `I wait for "condition" of the "element" element`, currently singleElement and arrayElements can be checked
- change step implementation: `I click the "keyName" key` to `I press the "keyName" key`

##### v1.16.1

- added changelog
- added directory for mailing service adapters [`emails`] and connect it to modules loading system
- fixed a bug where exported mailing service and the one used internally where a different instances
