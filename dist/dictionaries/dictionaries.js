'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _modulesLoader = require('../helpers/modules-loader.helper');

const modulesLoader = (0, _modulesLoader.create)();

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
    return this.availableDictionaries.find(dic => dic.isSatisfiedBy(name));
  }
}

const create = exports.create = (loader = modulesLoader) => new Dictionaries(loader);