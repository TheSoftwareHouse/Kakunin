import regexBuilder from './regex-matcher/regex-builder';

const AttributeMatcher = {
  isSatisfiedBy: function (prefix) {
    return prefix === 'attribute';
  },

  match: function (element, attributeName, regexName) {
    return element.getAttribute(attributeName).then((value) => (regexBuilder.buildRegex(`r:${regexName}`)).test(value));
  }
};

export default AttributeMatcher;
