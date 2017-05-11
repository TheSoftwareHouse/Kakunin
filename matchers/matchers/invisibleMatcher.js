const InvisibleMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'isNotVisible';
  },
  match: function(element) {
    return element.isPresent().then((isPresent) => !isPresent);
  }
};

module.exports = InvisibleMatcher;
