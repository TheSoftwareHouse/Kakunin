import { createDictionaryTransformer } from './transformer/dictionary.transformer';
import { createGeneratorTransformer } from './transformer/generator.transformer';
import { createVariableStoreTransformer } from './transformer/variable-store.transformer';
import { Transformer } from './transformer.interface';

class Transformers {
  constructor(private availableTransformers: Transformer[]) {}

  public transform(value: string, prefix?: string): any {
    const transformer = prefix ? this.findTransformer(prefix) : this.findTransformer(value.substr(0, 2));

    if (transformer === undefined) {
      return value;
    }

    return transformer.transform(value.substr(2));
  }

  public findTransformer(prefix: string): Transformer {
    return this.availableTransformers.find(transformer => transformer.isSatisfiedBy(prefix));
  }

  public addTransformer(transformer: Transformer): void {
    this.availableTransformers.push(transformer);
  }
}

const transformers = [createVariableStoreTransformer(), createDictionaryTransformer(), createGeneratorTransformer()];

export const create = (transf = transformers) => new Transformers(transf);
