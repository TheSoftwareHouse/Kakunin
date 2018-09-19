import { separator } from '../matchers';

class TextMatcher {
  isSatisfiedBy(prefix) {
    return prefix === 't';
  }

  match(element, ...params) {
    const expectedValue = params.join(separator);

    return element.getText().then((text) => {
      if (new RegExp(RegExp.escape(expectedValue)).test(text)) {
        return true;
      }

      return Promise.reject(`
        Matcher "TextMatcher" could not match value on element "${element.locator()}".
        Expected: "${expectedValue}", Given: "${text}"
      `);
    });
  }
}

export const textMatcher = new TextMatcher();
