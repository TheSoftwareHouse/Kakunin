interface MatchersInterface {
  addMatcher(matcher: MatcherInterface): void;
  match(element: object, matcherName: string): Promise<string | boolean>;
  findMatcher(prefix: string, ...params: [string]): MatcherInterface;
}
