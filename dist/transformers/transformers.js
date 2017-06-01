'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _variableStore = require('./transformer/variable-store.transformer');

var _dictionary = require('./transformer/dictionary.transformer');

class Transformers {
  constructor(transformers) {
    this.availableTransformers = transformers;
  }

  transform(value) {
    const transformer = this.findTransformer(value.substr(0, 2));

    if (transformer === undefined) {
      return value;
    }

    return transformer.transform(value.substr(2));
  }

  findTransformer(prefix) {
    return this.availableTransformers.find(transformer => prefix === transformer.prefix);
  }
}

const transformers = [(0, _variableStore.createVariableStoreTransformer)(), (0, _dictionary.createDictionaryTransformer)()];

const create = exports.create = (transf = transformers) => new Transformers(transf);