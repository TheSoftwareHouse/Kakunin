const variableStore = require('kakunin').variableStore;
const fetch = require('node-fetch');

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

  When(/^I store the content from "([^"]*)" endpoint as "([^"]*)" variable/, function (url, variableName) {
    return fetch(url)
      .then(res => res.json())
      .then(data => variableStore.storeVariable(variableName, JSON.parse(data.content)));
  })
});
