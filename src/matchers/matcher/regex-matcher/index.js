import regexBuilder from './regex-builder';
import regex from './regex';

const RegexMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'r' && typeof regex[name] !== 'undefined';
  },
  match: function (element, matcherName) {
    return element.getText().then((text) => {
      return element.getAttribute('value').then(function (value) {
        if (text === '') {
          if (value === null) {
            return false
          }

          return regexBuilder.buildRegex(`r:${matcherName}`).test(value);
        }

        return regexBuilder.buildRegex(`r:${matcherName}`).test(text);
      });
    });
  }
};

export default RegexMatcher;
