const { defineSupportCode } = require('cucumber');

const variableStore = require('../helpers/variableStore');
const generators = require('../generators').generators;

defineSupportCode(function ({ When }) {
  When('I generate random "{generatorName}" as "{variableName}"', function (generatorName, variableName) {
    return variableStore.storeVariable(variableName, generators.generate(generatorName));
  });

  When('I generate random "{generatorName}" "{generatorParam}" as "{variableName}"', function (generatorName, generatorParam, variableName) {
    return variableStore.storeVariable(
      variableName,
      generators.generate(generatorName, generatorParam)
    );
  });
});
