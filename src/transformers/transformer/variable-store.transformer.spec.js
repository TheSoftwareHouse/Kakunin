import { createVariableStoreTransformer } from './variable-store.transformer'

const chai = require('chai');
const expect = chai.expect;

describe('Variable store transformer', () => {
  it('returns replaced text', () => {
    const fakeValue = {
      replaceTextVariables: () => 'expected value'
    };
    const transformer = createVariableStoreTransformer(fakeValue);

    expect(transformer.transform('given value')).to.equal('expected value');
  });

  it('returns true when the prefix is correct', () => {
    const mockedPrefix = {
      isSatisfiedBy: (prefix) => prefix === 'v:'
    };
    const transformer = createVariableStoreTransformer(mockedPrefix);

    expect(transformer.isSatisfiedBy('v:')).to.equal(true);
  });

  it('returns false when the prefix is incorrect', () => {
    const mockedPrefix = {
      isSatisfiedBy: (prefix) => prefix === 'v:'
    };
    const transformer = createVariableStoreTransformer(mockedPrefix);

    expect(transformer.isSatisfiedBy('t:')).to.equal(false);
  });
});
