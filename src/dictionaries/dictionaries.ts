class Dictionaries {
  private availableDictionaries: any[];

  constructor() {
    this.availableDictionaries = [];
  }

  public getMappedValue(dictionaryName, key) {
    const dic = this.findDictionary(dictionaryName);

    if (dic === undefined) {
      throw new Error(`Could not find dictionary for ${dictionaryName}.`);
    }

    return dic.getMappedValue(key);
  }

  public findDictionary(name) {
    return this.availableDictionaries.find(dic => dic.isSatisfiedBy(name));
  }

  public findMappedValueByPhrase(phrase) {
    const parameters = phrase.split(':');
    if (parameters[0] === 'd') {
      const dictionary = this.findDictionary(parameters[1]);

      if (dictionary) {
        return this.getMappedValue(parameters[1], parameters[2]);
      }
    }

    return phrase;
  }

  public addDictionary(dictionary) {
    this.availableDictionaries.push(dictionary);
  }
}

export const create = () => new Dictionaries();
