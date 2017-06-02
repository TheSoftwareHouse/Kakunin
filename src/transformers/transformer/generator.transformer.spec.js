import { createGeneratorTransformer } from './generator.transformer';
import { expect } from 'chai';

describe('Generator transformer', () => {
  it('returns true when the prefix is correct', () => {
    const transformer = createGeneratorTransformer();

    expect(transformer.isSatisfiedBy('g:')).to.equal(true);
  });

  it('returns false when the prefix is incorrect', () => {
    const transformer = createGeneratorTransformer();

    expect(transformer.isSatisfiedBy('d:')).to.equal(false);
  });

  it('returns generated value ', () => {
    const mockedGenerators = {
      generate: (value) => 'my-generated-value'
    };
    const transformer = createGeneratorTransformer(mockedGenerators);

    expect(transformer.transform('generator:generate')).to.equal('my-generated-value');
  });
});
