class TextMatcher {
  isSatisfiedBy(prefix) {
    return prefix === 't';
  }

  match(element, matcherName) {
    return element.getText().then((text) => new RegExp(RegExp.escape(matcherName)).test(text));
  }
}

export const textMatcher = new TextMatcher();
