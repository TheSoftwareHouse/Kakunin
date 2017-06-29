class PresentMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'isPresent';
  }

  match(element) {
    return element.isPresent().then(() => true).catch(() => false);
  }
}

export const presentMatcher = new PresentMatcher();
