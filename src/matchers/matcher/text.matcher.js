const TextMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 't:';
  },

  match: function (element, matcherName) {
    return element.getText().then((text) => new RegExp(RegExp.escape(matcherName.substr(2))).test(text));
  }
};

export default TextMatcher;
