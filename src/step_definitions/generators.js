import { defineSupportCode } from 'cucumber';
import variableStore from '../web/variable-store.helper';
import { transformers } from '../transformers';

defineSupportCode(function({ When }) {
  When(/^I generate random "([^"]*)" as "([^"]*)"$/, function(generator, variableName) {
    return transformers.transform(`g:${generator}`).then(result => variableStore.storeVariable(variableName, result));
  });
});
