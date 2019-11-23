import store from '../../core/variable-store.helper';
import { VariableStore } from '../../core/variable-store.helper';
import { Transformer } from '../transformer.interface';

class VariableStoreTransformer implements Transformer {
  constructor(private variableStore: VariableStore) {}

  public isSatisfiedBy(prefix) {
    return prefix === 'v:';
  }

  public transform(value) {
    return this.variableStore.getVariableValue(value);
  }
}
export const createVariableStoreTransformer = (variableStore = store) => new VariableStoreTransformer(variableStore);
