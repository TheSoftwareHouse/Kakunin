module.exports = {
    "browserWidth": 1600,
    "browserHeight": 900,
    "timeout": 60,
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
    "baseUrl": "http://todomvc.com",
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
