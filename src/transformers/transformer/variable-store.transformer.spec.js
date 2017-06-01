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
});
