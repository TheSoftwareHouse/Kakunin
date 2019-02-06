interface Comparator {
  isSatisfiedBy(value: any[]): boolean;
  compare(values: any[], order: string): Promise<string | void>;
}
