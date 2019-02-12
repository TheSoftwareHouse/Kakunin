interface ValueTransformer {
  isSatisfiedBy(prefix: string): boolean;
  transform(transform: string): any;
}
