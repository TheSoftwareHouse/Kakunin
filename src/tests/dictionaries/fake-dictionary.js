class FakeDictionary {
  constructor() {
    this.values = {
      'some-key': 'some-value'
    };

    this.name = 'fake-dictionary';
  }

  isSatisfiedBy(name) {
    return this.name === name;
  }

  getMappedValue(key) {
    return this.values[key];
  }
}

module.exports = new FakeDictionary();
