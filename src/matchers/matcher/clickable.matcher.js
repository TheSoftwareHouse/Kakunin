class ClickableMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isClickable';
  }

  match(element) {
    return element
      .getAttribute('disabled')
      .then(function(disabled) {
        return ['disabled', true, 'true'].indexOf(disabled) === -1;
      })
      .then(result => {
        if (result) {
          return true;
        }

        return Promise.reject(`
          Matcher "ClickableMatcher" could find attribute disabled on element "${element.locator()}".
        `);
      });
  }
}

export const clickableMatcher = new ClickableMatcher();
