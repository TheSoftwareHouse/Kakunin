import regexBuilder from './regex-matcher/regex-builder';

const HrefMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'href';
  },

  match: function (element, matcherName) {
    const splittedValue = matcherName.split(':');

    return element.getAttribute('href').then((value) => (regexBuilder.buildRegex(`r:${splittedValue[2]}`)).test(value));
  }
};

export default HrefMatcher;
