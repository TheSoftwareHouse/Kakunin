import { create } from './dictionaries';
import fakeDictionary from '../tests/dictionaries/fake-dictionary';

import { expect } from 'chai';

const dictionaries = create();

dictionaries.addDictionary(fakeDictionary);

describe('Dictionaries', () => {
  it('throws an error when no dictionary was found', () => {
    expect(() => dictionaries.getMappedValue('unknown-dictionary', 'unknown-key'))
      .to.throw('Could not find dictionary for unknown-dictionary.');
  });

  it('returns mapped value for given key', () => {
    expect(dictionaries.getMappedValue('fake-dictionary', 'some-key')).to.equal('some-value');
  });

  it('returns mapped value for given key - directly from dictionaries', () => {
    expect(dictionaries.findMappedValueByPhrase('d:fake-dictionary:some-key')).to.equal('some-value');
  });

  it('adds a dictionary', () => {
    const customDictionary = {
      isSatisfiedBy: (name) => name === 'my-dictionary',
      getMappedValue: (key) => `mapped-${key}`
    };

    dictionaries.addDictionary(customDictionary);

    expect(dictionaries.getMappedValue('my-dictionary', 'some-key')).to.equal('mapped-some-key');
  });
});
