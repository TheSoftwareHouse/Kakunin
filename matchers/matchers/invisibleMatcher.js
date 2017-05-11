const InvisibleMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'isNotVisible';
  },
  match: function(element) {
    return element.isDisplayed().then(() => false).catch(() => true);
  }
};

module.exports = InvisibleMatcher;
