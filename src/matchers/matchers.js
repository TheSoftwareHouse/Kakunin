import * as matchers from './matcher';

export const separator = ':';

class Matchers {
  constructor() {
    this.availableMatchers = [
      matchers.regexMatcher,
      matchers.clickableMatcher,
      matchers.invisibleMatcher,
      matchers.notClickableMatcher,
      matchers.presentMatcher,
      matchers.textMatcher,
      matchers.visibleMatcher,
      matchers.attributeMatcher,
      matchers.currentDateMatcher,
    ];
  }

  addMatcher(matcher) {
    this.availableMatchers.push(matcher);
  }

  match(element, matcherName) {
    const splittedValue = matcherName.split(separator);
    const matcher = this.findMatcher(splittedValue[0], splittedValue.slice(1));

    if (matcher === undefined) {
      throw new Error(`Could not find matcher for ${matcherName}.`);
    }

    return matcher.match(element, ...splittedValue.slice(1));
  }

  findMatcher(prefix, params) {
    return this.availableMatchers.find(matcher => matcher.isSatisfiedBy(prefix, ...params));
  }
}

export const create = () => new Matchers();
