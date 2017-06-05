'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDictionaryTransformer = undefined;

var _dictionaries = require('../../dictionaries');

class DictionaryTransformer {
  constructor(dictionaries) {
    this.dictionaries = dictionaries;
  }

  isSatisfiedBy(prefix) {
    return 'd:' === prefix;
  }

  transform(value) {
    const splittedValue = value.split(':');
    return this.dictionaries.getMappedValue(splittedValue[0], splittedValue[1]);
  }
}
const createDictionaryTransformer = exports.createDictionaryTransformer = (dicts = _dictionaries.dictionaries) => new DictionaryTransformer(dicts);