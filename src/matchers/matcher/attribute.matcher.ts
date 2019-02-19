import { regexBuilder } from './regex-matcher/regex-builder';
import { Matcher } from '../matcher.interface';

class AttributeMatcher implements Matcher {
  public isSatisfiedBy(prefix) {
    return prefix === 'attribute';
  }

  public match(element, attributeName, regexName) {
    return element.getAttribute(attributeName).then(value => {
      if (regexBuilder.buildRegex(`r:${regexName}`).test(value)) {
        return true;
      }

      const transformedRegexName = `r:${regexName}`;
      return Promise.reject(`
        Matcher "AttributeMatcher" could not match regex on element "${element.locator()}" on attribute "${attributeName}". 
        Expected to match: "${regexBuilder.buildRegex(transformedRegexName).toString()}", Given: "${value}"
      `);
    });
  }
}

export const attributeMatcher = new AttributeMatcher();
