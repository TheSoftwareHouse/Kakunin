import { createVariableStoreTransformer } from './transformer/variable-store.transformer';
import { createDictionaryTransformer } from './transformer/dictionary.transformer';
import { createGeneratorTransformer } from './transformer/generator.transformer';

class Transformers {
  constructor(transformers) {
    this.availableTransformers = transformers
  }

  transform(value) {
    const transformer = this.findTransformer(value.substr(0, 2));

    if (transformer === undefined) {
      return value;
    }

    return transformer.transform(value.substr(2));
  }

  findTransformer(prefix) {
    return this.availableTransformers.find((transformer) => transformer.isSatisfiedBy(prefix));
  }

  addTransformer(transformer) {
    this.availableTransformers.push(transformer);
  }
}

const transformers = [
  createVariableStoreTransformer(),
  createDictionaryTransformer(),
  createGeneratorTransformer(),
];

export const create = (transf = transformers) => new Transformers(transf);
