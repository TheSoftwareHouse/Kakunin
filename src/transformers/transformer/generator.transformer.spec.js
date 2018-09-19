import { createGeneratorTransformer } from './generator.transformer';

describe('Generator transformer', () => {
  it('returns true when the prefix is correct', () => {
    const transformer = createGeneratorTransformer();

    expect(transformer.isSatisfiedBy('g:')).toEqual(true);
  });

  it('returns false when the prefix is incorrect', () => {
    const transformer = createGeneratorTransformer();

    expect(transformer.isSatisfiedBy('d:')).toEqual(false);
  });

  it('returns generated value ', () => {
    const mockedGenerators = {
      generate: (value) => 'my-generated-value'
    };
    const transformer = createGeneratorTransformer(mockedGenerators);

    expect(transformer.transform('generator:generate')).toEqual('my-generated-value');
  });
});
