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
