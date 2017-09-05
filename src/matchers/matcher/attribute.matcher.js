import { regexBuilder } from './regex-matcher/regex-builder';

class AttributeMatcher {
  isSatisfiedBy(prefix) {
    return prefix === 'attribute';
  }

  match(element, attributeName, regexName) {
    return element.getAttribute(attributeName).then((value) => (regexBuilder.buildRegex(`r:${regexName}`)).test(value));
  }
}

export const attributeMatcher = new AttributeMatcher();
