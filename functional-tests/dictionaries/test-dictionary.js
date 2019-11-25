const { dictionaries } = require('kakunin');
const { BaseDictionary } = require('kakunin');

class TestDictionary extends BaseDictionary {
  constructor() {
    super('test-dictionary', {
      'test-name': 'Janek',
      'test-value': 'lux',
      'test-user': 'tomg',
      'custom-value1': 'Some custom name 1',
      'custom-id': 'MY_CUSTOM_ID_',
      'one': '1',
      'non-existing': 'does not exist!'
    });
  }
}

dictionaries.addDictionary(new TestDictionary());
