interface ComparatorsInterface {
  compare(values: any[], order: string): Promise<string | void>;
  findComparator(values: any[]): ComparatorInterface;
  addComparator(addComparator: ComparatorInterface): void;
}
