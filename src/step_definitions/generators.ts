import { When } from 'cucumber';
import { transformers } from '../transformers';
import variableStore from '../web/variable-store.helper';

When(/^I generate random "([^"]*)" as "([^"]*)"$/, (generator, variableName) => {
  return transformers.transform(`g:${generator}`).then(result => variableStore.storeVariable(variableName, result));
});
