import { create } from './dictionaries';
import { create as createModulesLoader } from '../helpers/modules-loader.helper';
import { expect } from 'chai';

const modulesLoader = createModulesLoader({
  projectPath: process.cwd(),
  dictionaries: [
    '/src/tests/dictionaries'
  ]
});

const dictionaries = create(modulesLoader);

describe('Dictionaries', () => {
  it('throws an error when no dictionary was found', () => {
    expect(() => dictionaries.getMappedValue('unknown-dictionary', 'unknown-key'))
      .to.throw('Could not find dictionary for unknown-dictionary.');
  });

  it('return mapped value for given key', () => {
    expect(dictionaries.getMappedValue('fake-dictionary', 'some-key')).to.equal('some-value');
  });
});
