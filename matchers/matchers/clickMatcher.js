const ClickMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'isClickable';
  },
  match: function (element) {
    return element.isEnabled().then((isEnabled) => isEnabled);
  }
};

module.exports = ClickMatcher;
