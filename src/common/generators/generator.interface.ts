export interface Generator {
  isSatisfiedBy(name: string): boolean;
  generate(...params: any): Promise<any>;
}
