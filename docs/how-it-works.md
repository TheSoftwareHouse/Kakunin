---
id: how-it-works
title: How it works
---

Kakunin is built with `no-js` experience in mind. Because of that you're able to test even complicated apps just
by knowing Kakunin (Gherkin) steps and a few good practices.

## Concepts

Kakunin uses `cucumber-js` internally, because of that all tests (or rather scenarios) are using `Gherkin` as a "programming"
language.

A simple scenario could look like this:

```gherkin
Feature:
    Scenario: Display user profile for logged user
        Given I am logged in as a "user"
        When the "dashboard" page is displayed
        And I click the "profileButton" element
        Then the "myProfile" page is displayed
        And the "myName" element is visible
```

This is how most of Kakunin test scenarios look like.

There are a few concepts to be explained.


## Page objects

Page object is a code representation of a page displayed in browser. Kakunin has built-in `BasePage` page object, that you should extend.

Page object contains information about page url, its elements, locators, but can also have some custom methods if necessary.

A very simple example of Kakunin's Page Object could look like the following:

```javascript
const { BasePage } = require('kakunin');

class DashboardPage extends BasePage {
    constructor() {
        super();
        
        this.url = '/dashboard';
    }
}

module.exports = DashboardPage;
```

As you can see a basic Page Object must extend one of the Kakunin's Objects and needs to have url field defined (`this.url`).
 
This code should be saved inside `pages` directory in a file with `js` extension. 
Note that a file name is very important, because we're going to use it as parameter for steps. For example, the following step:
```gherkin
When the "dashboard" page is displayed
``` 
expects that there is a file named `dashboard.js` inside the `pages` directory. 


Every step that we are using is somehow connected to an object called `currentPage`. This object value is set to a 
page object that we expect to be on.

This is done by two kinds of steps:

* `Then the "dashboard" page is displayed` - this one checks if current url in browser is the same as the one inside Page Object and changes a value of the `currentPage` field
 to this page object
* `When I visit the "dashboard" page` - this one goes to the url specified in Page Object and attaches the Page Object to the `currentPage` field as above 

This concept is a very simple and allows you to easily debug the framework. You can be sure that each subsequent step that declared below the ones above will be executed in context of a page object specified in those methods.
For example, having the following code:

```gherkin 
Feature:
    Scenario: Display user profile for logged user
        Given I am logged in as a "user"
        When the "dashboard" page is displayed
        And I click the "profileButton" element
        Then the "myProfile" page is displayed
        And the "myName" element is visible
```

The step named `And I click the "profileButton" element` is executed in context of `dashboard` Page Object, thus we can assume that `profileButton` should be defined inside the
`pages/dashboard.js` file.

At the same time the step `And the "myName" element is visible` is executed in context of `myProfile`, so `myName` should be defined in `pages/myProfile.js` file.


## Elements and locators

The second concept that you have to understand are elements and locators.

Every element that you see on website can be represented as a element inside the page object. This allows us to use it as a parameter for a step, as we did in:
`And the "myName" element is visible`.

Defining elements is very simple. Let's say we have such page object:

``` 
const { BasePage } = require('kakunin');

class DashboardPage extends BasePage {
    constructor() {
        super();
        
        this.url = '/dashboard';
    }
}

module.exports = DashboardPage;
```

Elements should be defined inside `constructor` method. Let's add element for `myName`:

``` 
const { BasePage } = require('kakunin');

class DashboardPage extends BasePage {
    constructor() {
        super();
        
        this.url = '/dashboard';
        
        this.myName = element(by.css('.myName'));
    }
}

module.exports = DashboardPage;
```

As you see we added a single line `this.myName = element(by.css('.myName'));`.

`by.css('.myName')` - is a locator, this is a standard protractor syntax, you can read more on protractors documentation

By joining `element` method with a locator, we created element to be used by our steps.
