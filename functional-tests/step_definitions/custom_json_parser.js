const variableStore = require('kakunin').variableStore;

const { defineSupportCode } = require('kakunin');

defineSupportCode(function ({ When }) {
  When(/^compare given JSON string with stored "([^"]*)" JSON:$/, function(storedJsonArray, json) {
    const removeNewLines = (str) => str.replace(/(\r\n|\n|\r)/gm, '');

    const storedJsonString = JSON.stringify(variableStore.getVariableValue(storedJsonArray));
    const expectedJsonString = JSON.stringify(JSON.parse(removeNewLines(json)));

    if (storedJsonString === expectedJsonString) {
      return Promise.resolve();
    }

    return Promise.reject('JSON strings are not the same!');
  });
});
