#Kakunin - automated testing framework by TSH & Takamol

##Requirements:

1. `node v7.0+`
2. `JDK` installed
3. `Chrome` installed

##How to install ?

1. Add Kakunin package to `package.json`. We advice to use newest possible version.
You can easily add Kakunin by adding this line:
```
"webdriver-manager": "12.0.6",
"protractor": "5.1.2",
"kakunin": "git+ssh://git@bitbucket.org/thesoftwarehouse/e2e-pascal.git#fixes"
```
to `devDependencies` in `package.json`
2. Add `"kakunin": "NODE_ENV=prod kakunin"` to `scripts` section in `package.json`
3. Run `npm run kakunin init` to create ready to use project
4. Run `npm run kakunin` to run tests. Kakunin comes with example feature, so you can test it just after configuration.

##How to test ?
1. Run `npm run test` to execute both units and functional tests.

##How to extend ?

Kakunin reveals it's own building blocks. You have an access to:

####Cucumbers method `defineSupportCode`. This can be used to add custom steps or hooks. For example:

```javascript
  const { defineSupportCode } = require('kakunin');
  
  defineSupportCode(({ When }) => {
    When(/^I use kakunin$/, function() {
      expect(true).to.equal(true);
    });
  });
```

###`BasePage` page object. This is default page object used in Kakunin. You can create your own page objects simple by
extending `BasePage`:

```
const { BasePage } = require('kakunin');

class MyPageObject extends BasePage {
  constructor() {
    this.myElement = element(by.css('.some-elemnt'));
  }
}

module.exports = new MyPageObject();
```

###`FormPage` page object. This is page object to handle any kind of a form operations. If you have a form on the given
page, then for sure you'll find this one useful.

```
const { FormPage } = require('kakunin');

class MyFormTypePage extends FormPage {
  constructor() {
    this.myElement = element(by.css('.some-elemnt'));
  }
}

module.exports = new MyFormTypePage();
```

###`regexBuilder` special builder for creating `RegExp` objects based on regexp name.

```
const { regexBuilder } = require('kakunin');

const myRegex = regexBuilder.buildRegex('r:number');

//myRegex will contain RegExp object that matches regular expression under the name "number" in regexes file.
```

###`variableStore` variable store allows you to store and read some values to be used during given scenario.

```
const { variableStore } = require('kakunin');

variableStore.storeVariable('some-name', 'some-value');

const myValue = variableStore.getVariableValue('some-name'); //contains 'some-value'
```

###`matchers` matchers are used to compare if given value is matching our expectation. For example if a value in table is a number.

You can add your own matcher:

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

###`dictionaries` dictionaries allows you to present complicated values in much more readable way. For example if an element must be
in a form of iri `/some-resource/123-123-123-23` and you wish to use `pending-resource` as it's alias.

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

###`generators` generators allows you to create random values

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

###`comparators` comparators allows you to check if a set of values has an expected order

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

###`handlers` handlers allows you to fill the form inputs and check value of filled fields

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

###`transformers` transformers can be used in steps `When I fill the "form" form with:` and `And the "joinOurStoreForm" form is filled with:`.

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

###`emailService` you can easily check emails with Kakunin. By default we give you MailTrap client implementation, but you can easily add your own client. 

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

##Useful options
1. To run all tags use `npm run kakunin`
2. To run a single tag use `npm run kakunin -- --tags="@tag"`
3. To run every feature containing all of the specified tags use `npm run kakunin -- --tags="@tag1 and @tag2"`
4. To run every feature containing one of the specified tags use `npm run kakunin -- --tags="@tag1 or @tag2"`
5. To run every feature not containing specified tags use `npm run kakunin -- --tags="not @tag"`

You can join tags expression as you wish.
