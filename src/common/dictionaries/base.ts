class BaseDictionary {
  public readonly name: string;
  public readonly values: object;

  constructor(name, values) {
    this.name = name;
    this.values = values;
  }

  public isSatisfiedBy(name: string): boolean {
    return this.name === name;
  }

  public getMappedValue(key: string): string {
    return this.values[key];
  }
}

export default BaseDictionary;
