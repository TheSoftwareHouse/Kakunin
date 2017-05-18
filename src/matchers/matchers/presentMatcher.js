const PresentMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'isPresent';
  },

  match: function (element, matcherName) {
    return element.isPresent().then(() => true).catch(() => false);
  }
};

module.exports = PresentMatcher;
