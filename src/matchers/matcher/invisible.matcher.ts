class InvisibleMatcher implements Matcher {
  public isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isNotVisible';
  }

  public async match(element) {
    try {
      await element.isDisplayed();
      return Promise.reject(`
        Matcher "InvisibleMatcher" could find element "${element.locator()}". Expected element to be invisible.
      `);
    } catch (err) {
      return true;
    }
  }
}

export const invisibleMatcher = new InvisibleMatcher();
