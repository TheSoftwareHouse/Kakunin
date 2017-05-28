const ClickableMatcher = {
  isSatisfiedBy: function (prefix, name) {
    return prefix === 'f:' && name === 'isClickable';
  },
  match: function (element) {
    return element.getAttribute('disabled').then(function (disabled) {
      return ['disabled', true, 'true'].indexOf(disabled) === -1;
    });
  }
};

export default ClickableMatcher;
