interface Matcher {
  isSatisfiedBy(prefix: string, name?: string): boolean;
  match(element: object, param1?: string, param2?: string): Promise<string | boolean>;
}
