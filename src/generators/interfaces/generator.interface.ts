interface DataGenerator {
  isSatisfiedBy(name: string): boolean;
  generate(...params: any): Promise<any>;
}
