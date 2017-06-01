import store from '../../helpers/variable-store.helper';

class VariableStoreTransformer {
  constructor(variableStore) {

    this.variableStore = variableStore;
    this.prefix = 'v:';
  }

  transform(value) {
    return this.variableStore.replaceTextVariables(value);
  }
}
export const createVariableStoreTransformer = (variableStore = store) => new VariableStoreTransformer(variableStore);
