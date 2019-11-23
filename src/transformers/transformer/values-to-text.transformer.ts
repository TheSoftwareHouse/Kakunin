import { Transformer } from '../transformer.interface';
import { VariableStore } from '../../core/variable-store.helper';
import { createDictionaryTransformer } from './dictionary.transformer';
import { dictionaries as dicts, Dictionaries } from '../../dictionaries';
import store from '../../core/variable-store.helper';

class ValuesToTextTransformer implements Transformer {
  constructor(private dictionaries: Dictionaries, private variableStore: VariableStore) {}

  public isSatisfiedBy(prefix: string): boolean {
    return prefix === 't:d:' || prefix === 't:v:';
  }

  public transform(value: string): string {
    if (value.includes('d:')) {
      const valueToTransform = value.replace('t:d:', '');

      return `t:${createDictionaryTransformer(this.dictionaries).transform(valueToTransform)}`;
    }

    return this.variableStore.replaceTextVariables(value);
  }
}

export const createValueToTextTransformer = (dictionaries = dicts, variableStore = store) =>
  new ValuesToTextTransformer(dictionaries, variableStore);
