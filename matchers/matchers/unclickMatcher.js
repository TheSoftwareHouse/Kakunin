const UnclickMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'isNotClickable';
  },
  match: function (element) {
    return element.isEnabled().then((isEnabled) => !isEnabled);
  }
};

module.exports = UnclickMatcher;
