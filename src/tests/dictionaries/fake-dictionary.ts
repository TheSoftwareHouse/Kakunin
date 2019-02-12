import BaseDictionary from '../../dictionaries/base';

class FakeDictionary extends BaseDictionary {
  constructor() {
    super('fake-dictionary', {
      'some-key': 'some-value',
    });
  }
}

export = new FakeDictionary();
