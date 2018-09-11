# Kakunin - automated testing framework
#### Migration to 2.0.0 version

What needs to be done:
1. Remove all locators from Page Objects
```javascript
this.exampleLocator = by.css('.unique-class');
```

needs to be changed to:

```javascript
this.exampleLocator = $('.unique-class');
```

2. Remove headers `| element | value |` from all steps
```gherkin
And there are "equal 1" following elements for element "rows":
   | element   | value  |
   | firstName | t:John |
   | lastName  | t:Doe  |
```

needs to be changed to:

```gherkin
And there are "equal 1" following elements for element "rows":
   | firstName | t:John |
   | lastName  | t:Doe  |
```

3. Delete `isExternal` from all Page Objects, if you are using Angular application
```javascript
class ExamplePage extends BasePage {
  constructor() {
    super();
    this.isExternal = true;

    this.url = '/';

    this.selector = $('.some-class');
  }
```

needs to be changed to:

```javascript
class ExamplePage extends BasePage {
  constructor() {
    super();

    this.url = '/';

    this.selector = $('.some-class');
  }
```

4. Change `exports` in Page Objects:
The last line in each of the page objects
```javascript
module.exports = new ExamplePage();
```

needs to be changed to:

```javascript
module.exports = ExamplePage;
```


5. Change `dictionaries`, example:
```javascript
const { dictionaries } = require('kakunin');

class TestDictionary {
  constructor() {
    this.values = {
      'test-name': 'Janek',
      'test-value': 'lux'
    };

    this.name = 'test-dictionary';
  }

  isSatisfiedBy(name) {
    return this.name === name;
  }

  getMappedValue(key) {
    return this.values[key];
  }
}

dictionaries.addDictionary(new TestDictionary());
```

needs to be changed to:

```javascript
const { dictionaries } = require('kakunin');
const { BaseDictionary } = require('kakunin');

class TestDictionary extends BaseDictionary {
  constructor() {
    super('test-dictionary', {
      'test-name': 'Janek',
      'test-value': 'lux'
    });
  }
}

dictionaries.addDictionary(new TestDictionary());
```
