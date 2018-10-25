'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareBrowserInstance = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prepareBrowserInstance = exports.prepareBrowserInstance = (browserConfig, specs) => {
  const instance = _lodash2.default.cloneDeep(browserConfig);
  instance.specs = specs;

  return instance;
};