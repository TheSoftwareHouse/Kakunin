Kakunin allows you to easily add a custom code in order to extend it's functionality.

##Internal services

###Regex builder

Regex builder is a special builder for creating `RegExp` objects based on regexp name. Internally it has access to not only to all built-in 
regular expression files, but also custom ones specified by user. 

```
const { regexBuilder } = require('kakunin');

const myRegex = regexBuilder.buildRegex('r:number');

//myRegex will contain RegExp object that matches regular expression under the name "number" in regexes file.
```

###Variable store

Variable store allows you to store and read some values to be used during given scenario.

```
const { variableStore } = require('kakunin');

variableStore.storeVariable('some-name', 'some-value');

const myValue = variableStore.getVariableValue('some-name'); //contains 'some-value'
```

###User provider

Kakunin comes with functionality that allows you to easily load credentials for a given account type - `UserProvider`.

In `kakunin.conf.js` you can find a section `accounts`.

The structure it has is very simple: 

``` 
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
```

`someAccount` - the name of accounts group

`accounts` - an array of account credentials (in order to be able to check if a `currentUser` got an email, this has to have an `email` key, otherwise account can have any kind of
properties)

Use provider is accessible inside any kind of a step by calling `this.userProvider`. It comes with a single method:

`this.userProvider.getUser(groupName)` - returns an account credentials for a given user group.

It is a good practice to save a current user in `this.currentUser` variable for a email checking service.

##Adding custom code

###Custom step

In order to add a custom step, you have to create inside of a directory specified as `step_definitions` in kakunin configuration file `default: /step_definitions`.

We're using `cucumber-js 2.X` so in order to add custom step you have to use `defineSupportCode` method like this:

```
  const { defineSupportCode } = require('kakunin');
  
  defineSupportCode(({ When }) => {
    When(/^I use kakunin$/, function() {
      expect(true).to.equal(true);
    });
  });
```

###Page objects

Kakunin comes with some built-in page objects, that should be used as a base for your page objects.

In order to create a custom one, create a file inside the `pages` directory and extend either `BasePage` or `FormPage` from kakunin package.

```
const { BasePage } = require('kakunin');

class MyPageObject extends BasePage {
  constructor() {
    this.myElement = element(by.css('.some-elemnt'));
  }
}

module.exports = new MyPageObject();
```

The only difference between `BasePage` and `FormPage` is a support for form submission.

```
const { FormPage } = require('kakunin');

class MyFormTypePage extends FormPage {
  constructor() {
    this.myElement = element(by.css('.some-elemnt'));
  }
}

module.exports = new MyFormTypePage();
```

### Matchers

Matchers are used to compare if given value is matching our expectation. For example if a value in table is a number.

You can add your own matcher as below:

```
const { matchers } = require('kakunin');

class MyMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'm:' && name === 'pending';
  }
 
  match(protractorElement, matcherName) {
    return protractorElement.getText().then((value) => value === 'pending'); 
  }
}

matchers.addMatcher(new MyMatcher());
```

###Dictionaries

Dictionaries allows you to present complicated values in much more readable way. For example if an element must be
in a form of IRI `/some-resource/123-123-123-23` and you wish to use `pending-resource` as it's alias.

You can add your own dictionary:

```
const { dictionaries } = require('kakunin');

class MyDictionary{
  constructor() {
    this.values = {
      '/some-resource/123-123-123-23':'pending-resource'
    };
    
    this.name === 'resources';
  }
  
  isSatisfiedBy(name) {
    return this.name === name;
  }

  getMappedValue(key) {
    return this.values[key];
  }
}

dictionaries.addDictionary(new MyDictionary());
```

###Generators

Generators allows you to create random values

You can add your own generator:

```
const { generators } = require('kakunin');

class MyGeneerator{
  isSatisfiedBy(name) {
    return this.name === 'my-generator';
  }

  generate(params) {
    return Promise.resolve('some-random-value');
  }
}

generators.addGenerator(new MyGeneerator());
```

###Comparators

Comparators allows you to check if a set of values has an expected order

You can add your own comparators:

```
const { comparators } = require('kakunin');

class MyComparator {
  isSatisfiedBy(values) {
    for(let i=0; i<values.length; i++) {
      if (values[i] !== 'foo' && values[i] !== 'bar') {
        return false;
      }
    }

    return true;
  }
  
  compare(values, order) {
    for (let i = 1; i < values.length; i++) {
      const previousValue = values[i - 1];
      const currentValue = values[i];

      if (previousValue === currentValue) {
        return Promise.reject('Wrong order');
      }
    }

    return Promise.resolve('Foo bar!');
  }
};

comparators.addComparator(new MyComparator());
```

###Form handlers

Form handlers allows you to fill the form inputs and check value of filled fields

You can add your own handlers:

```
const { handlers } = require('kakunin');

const MyHandler {
  constructor() {
    this.registerFieldType = false;
    this.fieldType = 'default';
  }

  isSatisfiedBy(element, elementName) {
    return Promise.resolve(elementName === 'someElementName');
  }
 
  handleFill(page, elementName, desiredValue) {
    return page[elementName].isDisplayed()
      .then(function () {
        return page[elementName].clear().then(function () {
          return page[elementName].sendKeys(desiredValue);
        });
      }
    );
  }

  handleCheck(page, elementName, desiredValue) {
    return page[elementName].isDisplayed()
      .then(function () {
        return page[elementName].getAttribute('value').then(function (value) {
          if (value === desiredValue) {
            return Promise.resolve();
          }

          return Promise.reject(`Expected ${desiredValue} got ${value} for text input element ${elementName}`);
        });
      }
    );
  }
};

handlers.addHandler(new MyHandler());
```

###Transformers

Transformers can be used in steps `When I fill the "form" form with:` and `And the "joinOurStoreForm" form is filled with:`.

Existing transformers:
- generators (prefix: `g:`)
- dictionaries (prefix: `d:`)
- variableStore (prefix: `v:`)
Transformers can be used in mentioned steps by using specific 'prefix', parameters are sent after `:` sign.
Example:
`g:generatorName:param:param`

You can add your own handlers:
```
const { transformers } = require('kakunin');

class MyTransformer {

  isSatisfiedBy(prefix) {
    return 'yourPrefix:' === prefix;
  }

  transform(value) {
    //code
  }
}
transformers.addTransformer(new MyTransformer());
```

###Email checking service

You can easily check emails with Kakunin. By default we give you MailTrap client implementation, but you can easily add your own client. 

```
const { emailService } = require('kakunin');

class MyEmailService {
  //you have access to full kakunin config
  isSatisfiedBy(config) {
    return config.email.type === 'my-custom-email-service';
  }
  
  //method used to clear emails before tests
  clearInbox() {
    ...
  }
  
  //method used to get emails - this method should return emails in format described below
  getEmails() {
    ...
  }
  
  //method used to retrive atachments for given email - should return attachments in format described below
  getAttachments(email) {
    ...
  }
  
  //method used to mark given email as read
  markAsRead(email) {
    ...
  }
}

emailService.addAdapter(new MyEmailService());
```

Emails should be returned as an array of objects with given schema:
``` 
  [
    {
      "subject": "SMTP e-mail test",
      "sent_at": "2013-08-25T19:32:07.567+03:00",
      "from_email": "me@railsware.com",
      "from_name": "Private Person",
      "to_email": "test@railsware.com",
      "to_name": "A Test User",
      "html_body": "",
      "text_body": "This is a test e-mail message.\r\n",
      "email_size": 193,
      "is_read": true,
      "created_at": "2013-08-25T19:32:07.576+03:00",
      "updated_at": "2013-08-25T19:32:09.232+03:00",
      "sent_at_timestamp": 1377448326
    }
  ]
```

this is MailTrap email format.

Attachments should be returned as an array of objects with given schema:

``` 
[
  {
    "id": 1737,
    "message_id": 54508,
    "filename": "Photos.png",
    "attachment_type": "attachment",
    "content_type": "image/png",
    "content_id": "",
    "transfer_encoding": "base64",
    "attachment_size": 213855,
    "created_at": "2013-08-16T00:39:34.677+03:00",
    "updated_at": "2013-08-16T00:39:34.677+03:00",
    "attachment_human_size": "210 KB",
    "download_path": "/api/v1/inboxes/3/messages/54508/attachments/1737/download"
  }
]
```

this is MailTrap attachment format.
