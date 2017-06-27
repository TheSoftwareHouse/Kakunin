import regexBuilder from './regex-matcher/regex-builder';

const AttributeMatcher = {
  isSatisfiedBy: function (prefix) {
    return prefix === 'attribute';
  },

  match: function (element, matcherName) {
    const splittedValue = matcherName.split(':');

    return element.getAttribute(splittedValue[1]).then((value) => (regexBuilder.buildRegex(`r:${splittedValue[2]}`)).test(value));
  }
};

export default AttributeMatcher;
