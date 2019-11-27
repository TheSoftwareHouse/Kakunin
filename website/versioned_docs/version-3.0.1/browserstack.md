---
id: version-3.0.1-browserstack
title: Browserstack integration
original_id: browserstack
---

## Browserstack project configuration

1. Create a new account in Browserstack: https://www.browserstack.com/
2. Login and visit the website https://www.browserstack.com/accounts/settings
3. Scroll down to the `Automation` section and copy:
- `Username`
- `Access Key`

4. Add a new `browserstack` section to the `kakunin.conf.js` file in the repository.
This is an example of a configuration for IE8 on Windows 7.

```javascript 
  browserstack: {
    seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
    defaultPort: 45691,
    capabilities: {
      'browserstack.user': 'example-user',
      'browserstack.key': 'example-key',
      'browserstack.local': true,
      nativeEvents: true,
      'browserstack.ie.driver': '3.14.0',
      'browserstack.selenium_version': '3.14.0',
      browserName: 'IE',
      browser_version: '8.0',
    }
  },
```

5. Set `'browserstack.user'` to the `Username` value that you copied from the `Automation` section
6. Set `'browserstack.key'` to the `Access Key` value that you copied from the `Automation` section

7. Visit the link https://www.browserstack.com/automate/capabilities if you want to find more capabilities for your project!.

## Run tests in Browserstack

Runs the application with the capabilities set in `kakunin.conf.js` file through the command line:
- `npm run kakunin -- --browserstack` 

<span style="color:red">Keep in mind that all capabilities that you set via CLI will be ignored!</span>

For example, `npm run kakunin -- --safari --browserstack` will ignore the `safari` part. 
Only `--browserstack` matters in case of running tests in Browserstack.


## Example kakunin.conf.js configuration file

This is an example configuration for Internet Explorer 8 on Windows 7. 

```javascript 
module.exports = {
  browserWidth: 1600,
  browserHeight: 900,
  timeout: 60,
  elementsVisibilityTimeout: 5,
  waitForPageTimeout: 5,
  downloadTimeout: 30,
  reports: '/reports',
  downloads: '/downloads',
  data: '/data',
  features: ['/features'],
  pages: ['/pages'],
  matchers: ['/matchers'],
  generators: ['/generators'],
  form_handlers: ['/form_handlers'],
  step_definitions: ['/step_definitions'],
  comparators: ['/comparators'],
  dictionaries: ['/dictionaries'],
  transformers: ['/transformers'],
  regexes: ['/regexes'],
  hooks: ['/hooks'],
  clearEmailInboxBeforeTests: false,
  clearCookiesAfterScenario: true,
  clearLocalStorageAfterScenario: true,
  email: null,
  headless: true,
  noGpu: true,
  type: 'otherWeb',
  baseUrl: 'http://localhost:8080',
  apiUrl: 'http://localhost:8080/',
  browserstack: {
    seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
    defaultPort: 45691,
    capabilities: {
      'browserstack.user': 'example-user',
      'browserstack.key': 'example-key',
      'browserstack.local': true,
      nativeEvents: true,
      'browserstack.ie.driver': '3.14.0',
      'browserstack.selenium_version': '3.14.0',
      browserName: 'IE',
      browser_version: '8.0',
    }
  },
};
```