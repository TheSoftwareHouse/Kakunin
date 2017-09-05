class ClickableMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isClickable';
  }

  match(element) {
    return element.getAttribute('disabled').then(function (disabled) {
      return ['disabled', true, 'true'].indexOf(disabled) === -1;
    });
  }
}

export const clickableMatcher = new ClickableMatcher();
