import { createValueToTextTransformer } from './values-to-text.transformer';
import { create as createDictionaries } from '../../dictionaries/dictionaries';
import fakeDictionary = require('../../tests/dictionaries/fake-dictionary');
import VariableStore from '../../core/variable-store.helper';

const dictionaries = createDictionaries();
dictionaries.addDictionary(fakeDictionary);

describe('Values to text transformer', () => {
  it('returns false if the prefix is incorrect - just dictionary', () => {
    const transformer = createValueToTextTransformer();

    expect(transformer.isSatisfiedBy('d:example-dictionary:example-key')).toEqual(false);
  });

  it('returns false if the prefix is incorrect - just variable', () => {
    const transformer = createValueToTextTransformer();

    expect(transformer.isSatisfiedBy('v:someVariableName')).toEqual(false);
  });

  it('returns false if the prefix is incorrect - just text matcher', () => {
    const transformer = createValueToTextTransformer();

    expect(transformer.isSatisfiedBy('t:example-text')).toEqual(false);
  });

  it('returns true when the prefix matches text matcher with variable store transformer', () => {
    const transformer = createValueToTextTransformer();

    expect(transformer.isSatisfiedBy('t:v:')).toEqual(true);
  });

  it('returns true when the prefix matches text matcher with dictionary transformer', () => {
    const transformer = createValueToTextTransformer();

    expect(transformer.isSatisfiedBy('t:d:')).toEqual(true);
  });

  it('returns value matched in dictionary', () => {
    const transformer = createValueToTextTransformer(dictionaries);

    expect(transformer.transform('t:d:fake-dictionary:some-key')).toEqual('t:some-value');
  });

  it('returns value matched in variableStore', () => {
    VariableStore.variables = [
      {
        name: 'storedFriendlyValue',
        value: 'variable 2nd',
      },
    ];

    const transformer = createValueToTextTransformer(null, VariableStore);

    expect(transformer.transform('t:v:storedFriendlyValue')).toEqual('t:variable 2nd');
  });
});
