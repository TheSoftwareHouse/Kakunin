import { createDictionaryTransformer } from './transformer/dictionary.transformer';
import { createGeneratorTransformer } from './transformer/generator.transformer';
import { createVariableStoreTransformer } from './transformer/variable-store.transformer';

class Transformers {
  constructor(private availableTransformers: ValueTransformer[]) {}

  public transform(value: string): any {
    const transformer = this.findTransformer(value.substr(0, 2));

    if (transformer === undefined) {
      return value;
    }

    return transformer.transform(value.substr(2));
  }

  public findTransformer(prefix: string): ValueTransformer {
    return this.availableTransformers.find(transformer => transformer.isSatisfiedBy(prefix));
  }

  public addTransformer(transformer: ValueTransformer): void {
    this.availableTransformers.push(transformer);
  }
}

const transformers = [createVariableStoreTransformer(), createDictionaryTransformer(), createGeneratorTransformer()];

export const create = (transf = transformers) => new Transformers(transf);
