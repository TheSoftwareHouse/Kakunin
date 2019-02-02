import store from '../../web/variable-store.helper';

class VariableStoreTransformer {
  private variableStore: any;

  constructor(variableStore) {
    this.variableStore = variableStore;
  }

  public isSatisfiedBy(prefix) {
    return prefix === 'v:';
  }

  public transform(value) {
    return this.variableStore.getVariableValue(value);
  }
}
export const createVariableStoreTransformer = (variableStore = store) => new VariableStoreTransformer(variableStore);
