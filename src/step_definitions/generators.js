import { defineSupportCode } from 'cucumber';
import variableStore from '../helpers/variable-store.helper';
import { generators } from '../generators';

defineSupportCode(function ({ When }) {
  When(/^I generate random "([^"]*)" as "([^"]*)"$/, function (generatorName, variableName) {
    return generators.generate(generatorName).then(result => variableStore.storeVariable(variableName, result));
  });

  When(/^I generate random "([^"]*)" "([^"]*)" as "([^"]*)"$/, function (generatorName, generatorParam, variableName) {
    return generators.generate(generatorName, generatorParam).then(result => variableStore.storeVariable(
      variableName,
      result
    ));
  });
});
