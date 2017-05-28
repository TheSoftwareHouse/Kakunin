import { defineSupportCode } from 'cucumber';
import variableStore from '../helpers/variable-store.helper';
import { generators } from '../generators';

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
