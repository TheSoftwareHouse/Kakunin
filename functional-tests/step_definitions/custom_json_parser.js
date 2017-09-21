const variableStore = require('kakunin').variableStore;

const { defineSupportCode } = require('kakunin');

defineSupportCode(function ({ When }) {
  When(/^compare given JSON string with stored "([^"]*)" JSON array:$/, function(storedJsonArray, data) {
    const table = data.raw();
    const storedJsonString = JSON.stringify(variableStore.getVariableValue(storedJsonArray));
    const jsonString = table[0];

    if (storedJsonString.includes(jsonString)) {
      return Promise.resolve();
    }

    return Promise.reject('JSON strings are not the same!');
  });
});
