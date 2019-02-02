import { create as createDictionaries } from '../../dictionaries/dictionaries';
import { createDictionaryTransformer } from './dictionary.transformer';
import fakeDictionary = require('../../tests/dictionaries/fake-dictionary');

const dictionaries = createDictionaries();

dictionaries.addDictionary(fakeDictionary);

describe('Dictionary transformer', () => {
  it('returns found position in the dictionary', () => {
    const transformer = createDictionaryTransformer(dictionaries);

    expect(transformer.transform('fake-dictionary:some-key')).toEqual('some-value');
  });

  it('returns true when the prefix is correct', () => {
    const transformer = createDictionaryTransformer();

    expect(transformer.isSatisfiedBy('d:')).toEqual(true);
  });

  it('returns false when the prefix is incorrect', () => {
    const transformer = createDictionaryTransformer();

    expect(transformer.isSatisfiedBy('v:')).toEqual(false);
  });
});
