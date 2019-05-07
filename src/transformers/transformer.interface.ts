export interface Transformer {
  isSatisfiedBy(prefix: string): boolean;
  transform(transform: string): any;
}
