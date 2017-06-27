import regexBuilder from './regex-matcher/regex-builder';

const HrefMatcher = {
  isSatisfiedBy: function (prefix, name) {
    const parameters = name.split(':');

    return prefix === 'f' && parameters[0] === 'href';
  },

  match: function (element, matcherName) {
    const splittedValue = matcherName.split(':');

    return element.getAttribute('href').then((value) => (regexBuilder.buildRegex(`r:${splittedValue[2]}`)).test(value));
  }
};

export default HrefMatcher;
