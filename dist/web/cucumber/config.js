'use strict';

var _config = require('../../core/config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ setDefaultTimeout }) {
  setDefaultTimeout(Number(_config2.default.timeout) * 1000);
});