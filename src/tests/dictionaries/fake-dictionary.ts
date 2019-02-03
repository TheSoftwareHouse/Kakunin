class FakeDictionary {
  private readonly values: { 'some-key': string };
  private readonly name: string;

  constructor() {
    this.values = {
      'some-key': 'some-value',
    };

    this.name = 'fake-dictionary';
  }

  public isSatisfiedBy(name) {
    return this.name === name;
  }

  public getMappedValue(key) {
    return this.values[key];
  }
}

export = new FakeDictionary();
