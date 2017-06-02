"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Dictionaries {
  constructor() {
    this.availableDictionaries = [];
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

  addDictionary(dictionary) {
    this.availableDictionaries.push(dictionary);
  }
}

const create = exports.create = () => new Dictionaries();