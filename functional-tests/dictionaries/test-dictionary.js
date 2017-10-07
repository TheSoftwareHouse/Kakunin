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
