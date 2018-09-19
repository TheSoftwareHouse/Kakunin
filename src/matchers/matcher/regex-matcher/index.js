import { regexBuilder } from './regex-builder';
import regex from './regex';

class RegexMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'r' && typeof regex[name] !== 'undefined';
  }

  match(element, regexName) {
    return element.getText()
      .then(text => {
        return element.getAttribute('value')
          .then(value => {
            const regex = regexBuilder.buildRegex(`r:${regexName}`);

            if (text === '') {
              if (value === null) {
                return Promise.reject(`
                  Matcher "RegexMatcher" could not match value for element "${element.locator()}".
                  Both text and attribute value are empty.
                `)
              }

              if (regex.test(value)) {
                return true;
              }

              return Promise.reject(`
                Matcher "RegexMatcher" could not match regex on element "${element.locator()}" on value "${value}". 
                Expected to match: "${regex.toString()}", Given: "${value}"
              `);
            }

            if (regex.test(text)) {
              return true;
            }

            return Promise.reject(`
              Matcher "RegexMatcher" could not match regex on element "${element.locator()}" on text "${text}". 
              Expected to match: "${regex.toString()}", Given: "${text}"
            `);
          })
      });
  }
}

export const regexMatcher = new RegexMatcher();
