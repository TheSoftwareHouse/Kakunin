Kakunin is built with `no-js` experience in mind. Because of that you're able to test even complicated apps just
by knowing Kakunin steps and a few good practices.

##Concepts

Kakunin uses `cucumber-js` internally, because of that all tests (or rather scenarios) are using `Gherkin` as a "programming"
language.

A simple scenario could look like this:

``` 
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

### Page objects

Page object is a code representation of a page displayed in browser. Kakunin has a two type of page objects built-in:

* `BasePage` - for all kind of pages that do not have any kind of a form
* `FormPage` - the same as `BasePage` + support for form interactions

In your code, you're going to create own page objects, that will extend one of Kakunin's.

We recommend to use `FormPage` as the one you're going to extend.

Page object contains information about page url, its elements, locators, but can also have some custom methods if necessary.

A very simple Kakunin's page object could look like this.

``` 
const { FormPage } = require('kakunin');

class DashboardPage extends FromPage {
    constructor() {
        super();
        
        this.url = '/dashboard';
        this.isExternal = false; // optional
    }
}

module.exports = new DashboardPage();
```

As you see a basic page object must extend one of Kakunin's and have to have url defined `this.url`.
 
Optionally if the page is a main page to be displayed then for `ng1` and `ng2` apps you have to provider `this.isExternal = true;` flag.
 
This code should be saved inside `pages` directory in a file with `js` extension. What is important is a name of this file, because we're going to use it
as parameter for steps, for example `When the "dashboard" page is displayed` expects that there is a file named `dashboard.js` inside the `pages` directory. 
 
Every step that we are using is somehow connected to a object called `currentPage`. This object value is set to a 
page object that we expect to be on.

This is done by two kind of steps:

* `the "dashboard" page is displayed` - this one checks if current url in browser is the same as the one inside page object and changes a value of `currentPage`
 to this page object
* `I visit the "dashboard" page` - this one goes to the url specified in page object and sets the `currentPage` to that page object

This concept is a very simple one and allows you to easily debug the Kakunin. You can assume that every step that is below one of this methods is executed in context of a page object specified in those methods.
For example if we have such code:

``` 
Feature:
    Scenario: Display user profile for logged user
        Given I am logged in as a "user"
        When the "dashboard" page is displayed
        And I click the "profileButton" element
        Then the "myProfile" page is displayed
        And the "myName" element is visible
```

`And I click the "profileButton" element` is executed in context of `dashboard` page objects. So we can assume that `profileButton` should be defined inside the
`dashboard.js` file.

At the same time `And the "myName" element is visible` is executed in context of `myProfile`, so `myName` should be inside `myProfile.js`.


### Elements and locators

The second concept that you have to understand are elements and locators.

Every element that you see on website can be represented as a element inside the page object. This allows us to use it as a parameter for a step, as we did in:
`And the "myName" element is visible`.

Defining elements is very simple. Let's say we have such page object:

``` 
const { FormPage } = require('kakunin');

class DashboardPage extends FromPage {
    constructor() {
        super();
        
        this.url = '/dashboard';
        this.isExternal = false; // optional
    }
}

module.exports = new DashboardPage();
```

Elements should be defined inside `constructor` method. Let's add element for `myName`:

``` 
const { FormPage } = require('kakunin');

class DashboardPage extends FromPage {
    constructor() {
        super();
        
        this.url = '/dashboard';
        this.isExternal = false; // optional
        
        this.myName = element(by.css('.myName'));
    }
}

module.exports = new DashboardPage();
```

As you see we added a single line `this.myName = element(by.css('.myName'));`.

`by.css('.myName')` - is a locator, this is a standard protractor syntax, you can read more on protractors documentation

By joining `element` method with a locator, we created element to be used by our steps.
