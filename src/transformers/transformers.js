import { createVariableStoreTransformer } from './transformer/variable-store.transformer';

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
    return this.availableTransformers.find((transformer) => prefix === transformer.prefix);
  }
}

const transformers = [
  createVariableStoreTransformer(),
];

export const create = (transformers = transformers) => new Transformers(transformers);
