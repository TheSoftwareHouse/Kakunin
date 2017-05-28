import { create as createModulesLoader } from '../helpers/modules-loader.helper';

const modulesLoader = createModulesLoader();

class Dictionaries {
  constructor(loader) {
    this.availableDictionaries = loader.getModules('dictionaries');
  }

  getMappedValue(dictionaryName, key) {
    const dic = this.findDictionary(dictionaryName);

    if (dic === undefined) {
      throw new Error(`Could not find dictionary for ${dictionaryName}.`);
    }

    return dic.getMappedValue(key);
  }

  findDictionary(name) {
    return this.availableDictionaries.find((dic) => dic.isSatisfiedBy(name));
  }
}

export const create = (loader = modulesLoader) => new Dictionaries(loader);
