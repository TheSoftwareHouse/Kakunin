---
id: configuration
title: Configuration
---

## Kakunin config

```
module.exports = {
    "browserWidth": 1600,
    "browserHeight": 900,
    "timeout": 60,
    "maxEmailRepeats": 5,
    "intervalEmail": 5,
    "elementsVisibilityTimeout": 5,
    "waitForPageTimeout": 5,
    "downloadTimeout": 30,
    "reports": "/reports",
    "downloads": "/downloads",
    "data": "/data",
    "features": [
        "/features"
    ],
    "pages": [
        "/pages"
    ],
    "matchers": [
        "/matchers"
    ],
    "generators": [
        "/generators"
    ],
    "form_handlers": [
        "/form_handlers"
    ],
    "step_definitions": [
        "/step_definitions"
    ],
    "comparators": [
        "/comparators"
    ],
    "dictionaries": [
        "/dictionaries"
    ],
    "transformers": [
        "/transformers"
    ],
    "regexes": [
        "/regexes"
    ],
    "hooks": [
        "/hooks"
    ],
    "clearEmailInboxBeforeTests": false,
    "clearCookiesAfterScenario": true,
    "clearLocalStorageAfterScenario": true,
    "email": null,
    "headless": false,
    "noGpu": false,
    "type": "otherWeb",
    "baseUrl": "http://localhost:8080",
    "accounts": {
        "someAccount": {
            "accounts": [
                {
                    "email": "",
                    "password": ""
                }
            ]
        }
    }
}

```

## Configuration options

`browserWidth` - width of browser window `default: 1600`

`browserheight` - height of browser window `default: 900`

`browserLanguage` - languge of browser `default: en-GB` ISO 639-1 codes

`timeout` - global timeout for a single step execution in seconds `default: 60`

`maxEmailRepeats` - maximum email repeats to catch email used in the email step

`intervalEmail` - interval for email checking step `default: 5` in seconds

`elementsVisibilityTimeout` - maximum wait timeout for element visibility `default: 5` seconds

`waitForPageTimeout` - maximum wait timeout for page visibility `default: 5` seconds

`downloadTimeout` - maximum wait timeout for file to be downloaded `default: 30` seconds

`emails` - array of paths to store emails related custom code

`reports` - path to store reports

`downloads` - path to store downloaded files

`data` - path to store test related files (for example files to be downloaded)

`feature` - array of paths to store features

`pages` - array of paths to store page objects

`matchers` - array of paths to store custom matchers

`generators` - array of paths to store custom generators

`form_handlers` - array of paths to store custom form handlers

`step_definitions` - array of paths to store custom steps

`comparators` - array of paths to store custom comparators

`dictionaries` - array of paths to store custom dictionaries

`transformers` - array of paths to store custom transformers

`regexes` - array of paths to store custom regexes

`hooks` - array of paths to store custom hooks

`clearEmailInboxBeforeTests` - flag to active clearing email inbox before tests are executed `default: false | true for apps with email checking functionality activated `

`clearCookiesAfterScenario` - flag to activate clearing cookies after every scenario `default: true`

`clearLocalStorageAfterScenario` - flag to activate clearing local storage after every scenario `default: true`

`email` - email configuration `default: null`

for mailtrap email checking system:

```javascript 
"type": "mailtrap",
"config": {
    "apiKey": "your-mailtrap-api-key",
    "inboxId": "your-mailtrap-inbox",
    "url": "https://mailtrap.io/api/v1"
}
```

for custom email checking system only type is required:

``` 
"type": "custom-type"
```

`headless` - flag to activate chrome headless browser `default: false`. Keep in mind that CLI command `-- --headless=false/true` has higher priority than the config file.

`noGpu` - flag to activate cpu only mode `default: false`

`type` - type of application either `ng1 | ng2 | otherWeb`

`baseUrl` - url of tested application

`accounts` - object to store accounts information. This is bound to `userProvider` and allows to use advanced email checking options like recipient checking.

```javascript 
"someAccount": {
    "accounts": [
        {
            "email": "",
            "password": ""
        }
    ]
}
```

## Environment variables

Kakunin uses a single `.env` file to load ENV variables. By default there is only one:

`FIXTURES_RELOAD_HOST` - allows you to specify host for fixtures reloading. This allows you to use `@reloadFixtures` tag on scenarios that should restore database to starting state, before the test is running
