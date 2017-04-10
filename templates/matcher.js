const matchers = require('pascal/matchers');

const ExampleMatcher = {
  isSatisfiedBy: function(prefix, name) {
    return prefix === 'e:';
  },

  match: function (element, matcherName) {
    const regexName = matcherName.substr(2);
    const regex = matchers.regexBuilder.buildRegex(`r:${regexName}`);

    return regex.test(element);
  }
};

module.exports = ExampleMatcher;
