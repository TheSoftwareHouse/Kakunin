import regex from './regex';
import { regexBuilder } from './regex-builder';

class RegexMatcher implements Matcher {
  public isSatisfiedBy(prefix, name) {
    return prefix === 'r' && typeof regex[name] !== 'undefined';
  }

  public match(element, regexName) {
    return element.getText().then(text => {
      return element.getAttribute('value').then(value => {
        const regularExpression = regexBuilder.buildRegex(`r:${regexName}`);

        if (text === '') {
          if (value === null) {
            return Promise.reject(`
                  Matcher "RegexMatcher" could not match value for element "${element.locator()}".
                  Both text and attribute value are empty.
                `);
          }

          if (regularExpression.test(value)) {
            return true;
          }

          return Promise.reject(`
                Matcher "RegexMatcher" could not match regex on element "${element.locator()}" on value "${value}". 
                Expected to match: "${regularExpression.toString()}", Given: "${value}"
              `);
        }

        if (regularExpression.test(text)) {
          return true;
        }

        return Promise.reject(`
              Matcher "RegexMatcher" could not match regex on element "${element.locator()}" on text "${text}". 
              Expected to match: "${regularExpression.toString()}", Given: "${text}"
            `);
      });
    });
  }
}

export const regexMatcher = new RegexMatcher();
