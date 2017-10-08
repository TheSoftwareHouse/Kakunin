"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Dictionary {
  constructor(dictionaryName, valuesObject) {
    this.values = valuesObject;
    this.name = dictionaryName;
  }

  isSatisfiedBy(name) {
    return this.name === name;
  }

  getMappedValue(key) {
    return this.values[key];
  }
}

exports.default = Dictionary;