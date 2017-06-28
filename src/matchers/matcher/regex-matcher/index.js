import { regexBuilder } from './regex-builder';
import regex from './regex';

console.log(regexBuilder);

class RegexMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'r' && typeof regex[name] !== 'undefined';
  }

  async match(element, matcherName) {
    const text = await element.getText();
    const value = await element.getAttribute('value');

    if (text === '') {
      if (value === null) {
        return false
      }

      return regexBuilder.buildRegex(`r:${matcherName}`).test(value);
    }

    return regexBuilder.buildRegex(`r:${matcherName}`).test(text);
  }
}

export const regexMatcher = new RegexMatcher();
