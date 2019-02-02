class Dictionary {
  private readonly name: any;
  private readonly values: any;

  constructor(dictionaryName, valuesObject) {
    this.values = valuesObject;
    this.name = dictionaryName;
  }

  public isSatisfiedBy(name) {
    return this.name === name;
  }

  public getMappedValue(key) {
    return this.values[key];
  }
}

export default Dictionary;
