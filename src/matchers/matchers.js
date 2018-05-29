import * as matcher from './matcher';

class Matchers {
  constructor() {
    this.availableMatchers = [
      matcher.regexMatcher,
      matcher.clickableMatcher,
      matcher.invisibleMatcher,
      matcher.notClickableMatcher,
      matcher.presentMatcher,
      matcher.textMatcher,
      matcher.visibleMatcher,
      matcher.attributeMatcher,
      matcher.currentDateMatcher,
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
    return this.availableMatchers.find((matcher) => matcher.isSatisfiedBy(prefix, ...params));
  }
}

export const create = () => new Matchers();
export const separator = ':';
