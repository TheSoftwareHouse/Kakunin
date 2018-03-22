#### v2.1.0

- added a possibility to test performance with browserMob (save .har files) and compare TTFB timing values,
- improvements for clicking element,
- every element step waits for visibilityOf element (waiting before step is no longer required in common cases)
- added `wait` method to helpers, also is exported outside of kakunin,
- added `deprecated` warning for `is Present` steps,
- added matcher for currentDate,
- code refactor for kakunin.conf.js,
- replaced generator step with real generator supporting multiple params,
- bugfix - init process,
- bugfix for texts with colons in text matcher (if text contained colons e.g. `some value: value: value`,
- bugfix - fixed issue with waiting for element in step `there are following elements in table "tableName"`,
- fix for templates,
- code cleanup (unused imports etc.),
- documentation update and  test update  (added useful undocumented and untested steps, removal of unused steps)



##### v2.0.0

- updated documentation
- added more functional tests
- added support for Windows
- added support for `relative` and `absolute` urls in Page Objects
- added `BaseDictionary` functionality
- added new step (support drag and drop) `I drag "elementName" element and drop over "dropOnElementName" element`
- fixed reports
- fixed step `I wait for the "elementName" element to disappear`
- updated libs (e.g. cucumber js)
- `isExternal` is no longer required in Page Objects (Angular)
- locators are no longer supported in Page Objects
- export `module.exports` has been changed in Page Objects
- removed `| element | value |` headers from first row in a steps
- `.gitkeep` is automatically created in reports catalog
- `RELOAD_FIXTURES_URL` has been moved to advanced configuration
- step `the "arrayElementName" element is visible` can be used now for an array element

##### v1.0.0

- updated documentation
- added license
- added example

##### v0.16.4

- updated documentation and readme

##### v0.16.3

- changed `There are "equal 4" following elements for element "rows":` error message to be more descriptive
- added express app to handle form submit tests
- added tests form html default field types and tabular content validation

##### v0.16.2

- added new step `I visit the "pageName" page with parameters:` which replaces wildcards with a values given in the table
- fixed step `I wait for "condition" of the "element" element`, currently timeout is set properly to `elementsVisibilityTimeout` key which is placed in kakunin.config.js 
- improved step `I wait for "condition" of the "element" element`, currently singleElement and arrayElements can be checked
- change step implementation: `I click the "keyName" key` to `I press the "keyName" key`

##### v0.16.1

- added changelog
- added directory for mailing service adapters [`emails`] and connect it to modules loading system
- fixed a bug where exported mailing service and the one used internally where a different instances
