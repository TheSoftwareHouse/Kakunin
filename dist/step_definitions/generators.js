'use strict';

var _cucumber = require('cucumber');

var _variableStore = require('../web/variable-store.helper');

var _variableStore2 = _interopRequireDefault(_variableStore);

var _transformers = require('../transformers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cucumber.defineSupportCode)(function ({ When }) {
  When(/^I generate random "([^"]*)" as "([^"]*)"$/, function (generator, variableName) {
    return _transformers.transformers.transform(`g:${generator}`).then(result => _variableStore2.default.storeVariable(variableName, result));
  });
});