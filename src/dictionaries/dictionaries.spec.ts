import { createDictionary as create, Base as BaseDictionary } from './';
import fakeDictionary = require('../tests/dictionaries/fake-dictionary');

const dictionaries = create();

dictionaries.addDictionary(fakeDictionary);

describe('Dictionaries', () => {
  it('throws an error when no dictionary was found', () => {
    expect(() => dictionaries.getMappedValue('unknown-dictionary', 'unknown-key')).toThrow(
      'Could not find dictionary for unknown-dictionary.'
    );
  });

  it('returns mapped value for given key', () => {
    expect(dictionaries.getMappedValue('fake-dictionary', 'some-key')).toEqual('some-value');
  });

  it('returns mapped value for given key - directly from dictionaries', () => {
    expect(dictionaries.findMappedValueByPhrase('d:fake-dictionary:some-key')).toEqual('some-value');
  });

  it('adds a dictionary', () => {
    const customDictionary = new BaseDictionary('my-dictionary', { 'some-key': 'mapped-some-key' });

    dictionaries.addDictionary(customDictionary);

    expect(dictionaries.getMappedValue('my-dictionary', 'some-key')).toEqual('mapped-some-key');
  });
});
