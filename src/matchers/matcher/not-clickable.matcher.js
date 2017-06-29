class NotClickableMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isNotClickable';
  }

  match(element) {
    return element.getAttribute('disabled').then(function (disabled) {
      return ['disabled', true, 'true'].indexOf(disabled) !== -1;
    });
  }
}

export const notClickableMatcher = new NotClickableMatcher();
