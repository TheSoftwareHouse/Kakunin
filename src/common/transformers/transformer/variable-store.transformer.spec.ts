import { createVariableStoreTransformer } from './variable-store.transformer';

describe('Variable store transformer', () => {
  it('returns replaced text', () => {
    const fakeValue: any = {
      getVariableValue: () => 'expected value',
    };
    const transformer = createVariableStoreTransformer(fakeValue);

    expect(transformer.transform('given value')).toEqual('expected value');
  });

  it('returns true when the prefix is correct', () => {
    const transformer = createVariableStoreTransformer();

    expect(transformer.isSatisfiedBy('v:')).toEqual(true);
  });

  it('returns false when the prefix is incorrect', () => {
    const transformer = createVariableStoreTransformer();

    expect(transformer.isSatisfiedBy('t:')).toEqual(false);
  });
});
