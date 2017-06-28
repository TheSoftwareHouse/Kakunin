class InvisibleMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isNotVisible';
  }

  match(element) {
    return element.isDisplayed().then(() => false).catch(() => true);
  }
}

export const invisibleMatcher = new InvisibleMatcher();
