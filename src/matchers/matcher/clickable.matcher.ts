class ClickableMatcher implements Matcher {
  public isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isClickable';
  }

  public match(element) {
    return element
      .getAttribute('disabled')
      .then(disabled => ['disabled', true, 'true'].indexOf(disabled) === -1)
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
