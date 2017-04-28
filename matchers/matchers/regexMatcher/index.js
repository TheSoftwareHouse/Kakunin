const regexBuilder = require('./regexBuilder');
const regex = require('./regex');

const RegexMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'r:' && typeof regex[name] !== 'undefined';
  },
  match: function (element, matcherName) {
    return element.getText().then((text) => {
      return element.getAttribute('value').then(function (value) {
        if (text === '') {
          return regexBuilder.buildRegex(matcherName).test(value);
        }

        return regexBuilder.buildRegex(matcherName).test(text);
      });
    });
  }
};

module.exports = RegexMatcher;
