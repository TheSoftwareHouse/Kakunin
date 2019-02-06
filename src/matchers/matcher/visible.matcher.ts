class VisibleMatcher implements Matcher {
  public isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isVisible';
  }

  public match(element) {
    return element
      .isDisplayed()
      .then(() => true)
      .catch(() => {
        return Promise.reject(`Matcher "VisibleMatcher" could not find element "${element.locator()}".`);
      });
  }
}

export const visibleMatcher = new VisibleMatcher();
