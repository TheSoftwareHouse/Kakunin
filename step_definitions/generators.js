const variableStore = require('../helpers/variableStore');
const generators = require('../generators').generators;

module.exports = function() {
  this.When('I generate random "$generatorName" as "$variableName"', function (generatorName, variableName) {
    return variableStore.storeVariable(variableName, generators.generate(generatorName));
  });

  this.When('I generate random "$generatorName" "$generatorParam" as "$variableName"', function (generatorName, generatorParam, variableName) {
    return variableStore.storeVariable(variableName, generators.generate(generatorName, generatorParam));
  });
};
