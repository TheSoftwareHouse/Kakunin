'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVariableStoreTransformer = undefined;

var _variableStore = require('../../helpers/variable-store.helper');

var _variableStore2 = _interopRequireDefault(_variableStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VariableStoreTransformer {
  constructor(variableStore) {
    this.variableStore = variableStore;
  }

  isSatisfiedBy(prefix) {
    return prefix === 'v:';
  }

  transform(value) {
    return this.variableStore.getVariableValue(value);
  }
}
const createVariableStoreTransformer = exports.createVariableStoreTransformer = (variableStore = _variableStore2.default) => new VariableStoreTransformer(variableStore);