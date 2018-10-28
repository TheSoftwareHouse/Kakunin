class NotClickableMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isNotClickable';
  }

  match(element) {
    return element
      .getAttribute('disabled')
      .then(function(disabled) {
        return ['disabled', true, 'true'].indexOf(disabled) !== -1;
      })
      .then(result => {
        if (result) {
          return true;
        }

        return Promise.reject(`
          Matcher "NotClickable" could not find attribute disabled on element "${element.locator()}".
        `);
      });
  }
}

export const notClickableMatcher = new NotClickableMatcher();
