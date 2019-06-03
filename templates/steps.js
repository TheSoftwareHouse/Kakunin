const { matchers, variableStore, Then } = require('kakunin');

Then(/^my matcher "([^"]*)" matches "([^"]*)"$/, function(matcher, text) {
  return expect(matchers.match(variableStore.replaceTextVariables(text), matcher)).toBe(true);
});
