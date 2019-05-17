#### next

- Added possibility to use third column in `fill/check form` steps (speed improvement required for Browserstack)

#### v3.0.0

- added support for Browserstack
- updated external libraries
- locked selenium-standalone-server to `3.14.0` to prevent bugs caused due to updated external libraries (we'll update it manually)
- coverted Kakunin from Javascript to Typescript
- added possibility to set priority of hooks <span style="color:red">Breaking change! Take a look to the MIGRATION-3.0.0.MD</span>

#### v2.6.0

- added possibility to control `headless` by CLI by a command `npm run kakunin -- --headless`
- added a possibility to visit URL w query params
- added support for Internet Explorer

#### v2.5.0

- added prepublish script to run tests before publish on NPM
- improved logging errors in the console
- added docusaurus documentation
- added possibility to test REST API

#### v2.4.0

- `When I pause` step has been deleted as the `browser.pause()` method is not supported since Node 8.x.x
- added `how to debug` section to the documentation
- added example how to configure docker for Kakunin projects
- configured Travis CI - unit and functional tests
- added support for Safari and Firefox browsers (take a look at the `cross-browser` section in the documentation)
- added parallel functionality (take a look at the `parallel` section in the documentation)
- configured prettier and eslint on `git commit` action
- added a possibility to use `When I store` and `There is element` steps on `input`/`textarea` fields
- added `faker` generator (generate random names, cities etc.)

##### v2.3.0

- added a new step: `success if email not found`
- updated `emails section` in the documentation
- added a possibility to answer prompts by a bash command in the `init process`
- fixed `file.js` step and added functional tests covering `compare xlsx with stored data`
- updated dependencies

##### v2.2.0

- added migration rules to version `v2.2.0`
- fixed `wait for url change` error
- improved CLI scripts and added tests
- improved `When I click step` - added an extra wait until the element is clickable
- fixed the cache problem in the `local storage` (wait until the cache is cleared)
- improved how the matchers errors are displayed
- changed Mocca into Jest
- changed Chai for Jest syntax
- moved `maxEmailRepeats` to the configuration
- updated Mailtrap adapter due to changed API (take a look at the `MIGRATION-2.2.0.MD`)
- updated dependencies

##### v2.1.0

- multiple code refactors
- improved url comparing
- fixed bug: missing "reports/report/features" catalogs required to execute tests
- added functionality which deletes all report files before a test run
- added new matcher - `f:currentDate:YYYY-MM-DD` to generate a current date
- added a possibility to test performance with browserMob (save .har files) and compare TTFB timing values
- improvements for clicking element
- every element step waits for visibilityOf element (waiting before step is no longer required in common cases)
- added wait method to helpers, also is exported outside of kakunin
- added deprecated warning for is Present steps
- added matcher for currentDate
- code refactor for kakunin.conf.js
- replaced generator step with real generator supporting multiple params
- code cleanup (unused imports etc.),
- documentation update and test update (added useful undocumented and untested steps, removal of unused steps)

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
