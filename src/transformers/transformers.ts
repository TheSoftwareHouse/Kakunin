import { createDictionaryTransformer } from './transformer/dictionary.transformer';
import { createGeneratorTransformer } from './transformer/generator.transformer';
import { createVariableStoreTransformer } from './transformer/variable-store.transformer';

class Transformers {
  private availableTransformers: any[];

  constructor(initTransformers) {
    this.availableTransformers = initTransformers;
  }

  public transform(value) {
    const transformer = this.findTransformer(value.substr(0, 2));

    if (transformer === undefined) {
      return value;
    }

    return transformer.transform(value.substr(2));
  }

  public findTransformer(prefix) {
    return this.availableTransformers.find(transformer => transformer.isSatisfiedBy(prefix));
  }

  public addTransformer(transformer) {
    this.availableTransformers.push(transformer);
  }
}

const transformers = [createVariableStoreTransformer(), createDictionaryTransformer(), createGeneratorTransformer()];

export const create = (transf = transformers) => new Transformers(transf);
