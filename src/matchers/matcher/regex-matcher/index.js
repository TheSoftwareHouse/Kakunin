import { regexBuilder } from './regex-builder';
import regex from './regex';

class RegexMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'r' && typeof regex[name] !== 'undefined';
  }

  match(element, matcherName) {
    return element.getText()
      .then(text => {
        return element.getAttribute('value')
          .then(value => {
            if (text === '') {
              if (value === null) {
                return false
              }

              return regexBuilder.buildRegex(`r:${matcherName}`).test(value);
            }

            return regexBuilder.buildRegex(`r:${matcherName}`).test(text);
          })
      })
  }
}

export const regexMatcher = new RegexMatcher();
