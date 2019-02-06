import * as matchers from './matcher';

export const separator = ':';

class Matchers {
  constructor(
    private availableMatchers: Matcher[] = [
      matchers.regexMatcher,
      matchers.clickableMatcher,
      matchers.invisibleMatcher,
      matchers.notClickableMatcher,
      matchers.presentMatcher,
      matchers.textMatcher,
      matchers.visibleMatcher,
      matchers.attributeMatcher,
      matchers.currentDateMatcher,
    ]
  ) {}

  public addMatcher(matcher: Matcher): void {
    this.availableMatchers.push(matcher);
  }

  public match(element: object, matcherName: string): Promise<string | boolean> {
    const splittedValue = matcherName.split(separator);
    const matcher = this.findMatcher(splittedValue[0], splittedValue[1]);

    if (matcher === undefined) {
      throw new Error(`Could not find matcher for ${matcherName}.`);
    }

    return matcher.match(element, ...splittedValue.slice(1));
  }

  public findMatcher(prefix: string, param: string): Matcher {
    return this.availableMatchers.find(matcher => matcher.isSatisfiedBy(prefix, param));
  }
}

export const create = () => new Matchers();
