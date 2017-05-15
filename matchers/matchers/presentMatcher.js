const PresentMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'isPresent';
  },

  match: function (element, matcherName) {
    return element.isPresent();
  }
};

module.exports = PresentMatcher;
