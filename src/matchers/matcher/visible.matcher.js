class VisibleMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isVisible';
  }

  match(element) {
    return element.isDisplayed().then(() => true).catch(() => false);
  }
}

export const visibleMatcher = new VisibleMatcher();
