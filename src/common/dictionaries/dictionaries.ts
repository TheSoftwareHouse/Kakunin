import Dictionary from './base';

export class Dictionaries {
  constructor(private availableDictionaries: Dictionary[] = []) {}

  public getMappedValue(dictionaryName: string, key: string): string {
    const dic = this.findDictionary(dictionaryName);

    if (dic === undefined) {
      throw new Error(`Could not find dictionary for ${dictionaryName}.`);
    }

    return dic.getMappedValue(key);
  }

  public findDictionary(name: string): Dictionary {
    return this.availableDictionaries.find((dic) => dic.isSatisfiedBy(name));
  }

  public findMappedValueByPhrase(phrase: string): string {
    const parameters = phrase.split(':');
    if (parameters[0] === 'd') {
      const dictionary = this.findDictionary(parameters[1]);

      if (dictionary) {
        return this.getMappedValue(parameters[1], parameters[2]);
      }
    }

    return phrase;
  }

  public addDictionary(dictionary: Dictionary): void {
    this.availableDictionaries.push(dictionary);
  }
}

export const create = () => new Dictionaries();
