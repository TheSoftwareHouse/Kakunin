const VisibleMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'isVisible';
  },
  match: function (element, matcherName) {
    return element.isDisplayed().then(() => true);
  }
};

module.exports = VisibleMatcher;
