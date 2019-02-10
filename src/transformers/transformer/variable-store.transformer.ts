import store from '../../web/variable-store.helper';
import { VariableStore } from '../../web/variable-store.helper';

class VariableStoreTransformer implements ValueTransformer {
  constructor(private variableStore: VariableStore) {}

  public isSatisfiedBy(prefix) {
    return prefix === 'v:';
  }

  public transform(value) {
    return this.variableStore.getVariableValue(value);
  }
}
export const createVariableStoreTransformer = (variableStore = store) => new VariableStoreTransformer(variableStore);
