const matchers = require('pascal/matchers').matchers;
const variableStore = require('pascal/helpers').variableStore;

module.exports = function() {
  this.Then('my matcher "$matcher" matches "$text"', function(matcher, text) {
    return expect(matchers.match(variableStore.replaceTextVariables(text), matcher)).to.be.true;
  });
};
