import { regexBuilder } from './regex-matcher/regex-builder';

class AttributeMatcher {
  isSatisfiedBy(prefix) {
    return prefix === 'attribute';
  }

  match(element, attributeName, regexName) {
    return element.getAttribute(attributeName).then(value => {
      if (regexBuilder.buildRegex(`r:${regexName}`).test(value)) {
        return true;
      }

      /* eslint-disable max-len */
      return Promise.reject(`
        Matcher "AttributeMatcher" could not match regex on element "${element.locator()}" on attribute "${attributeName}". 
        Expected to match: "${regexBuilder.buildRegex(`r:${regexName}`).toString()}", Given: "${value}"
      `);
      /* eslint-enable max-len */
    });
  }
}

export const attributeMatcher = new AttributeMatcher();
