import { defineSupportCode } from 'cucumber';
import variableStore from '../helpers/variable-store.helper';
import { transformers } from '../transformers';

defineSupportCode(function ({ When }) {
  When(/^I generate random "([^"]*)" as "([^"]*)"$/, function (transformerName, variableName) {
    return transformers.transform(transformerName).then(result => variableStore.storeVariable(variableName, result));
  });
});
