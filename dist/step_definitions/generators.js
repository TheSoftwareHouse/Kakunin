'use strict';

var _cucumber = require('cucumber');

var _variableStore = require('../helpers/variable-store.helper');

var _variableStore2 = _interopRequireDefault(_variableStore);

var _generators = require('../generators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cucumber.defineSupportCode)(function ({ When }) {
  When(/^I generate random "([^"]*)" as "([^"]*)"$/, function (generatorName, variableName) {
    return _generators.generators.generate(generatorName).then(result => _variableStore2.default.storeVariable(variableName, result));
  });

  When(/^I generate random "([^"]*)" "([^"]*)" as "([^"]*)"$/, function (generatorName, generatorParam, variableName) {
    return _generators.generators.generate(generatorName, generatorParam).then(result => _variableStore2.default.storeVariable(variableName, result));
  });
});