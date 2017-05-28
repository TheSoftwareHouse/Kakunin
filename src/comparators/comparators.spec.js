import { create } from './comparators';
import { create as createModuleLoader } from '../helpers/modules-loader.helper';
import { expect } from 'chai';

const modulesLoader = createModuleLoader({
  projectPath: process.cwd()
});

const comparators = create(modulesLoader);

describe('Comparators', () => {
  it('throws an error when no comparator was found', () => {
    const values = ['unspecified-value', 'other-value'];
    expect(() => comparators.compare(values, 'ascending')).to.throw(`Could not find comparator for ${values}.`);
  });

  it('compares values using comparator that can handle given set of values', (done) => {
    const numbers = [2, 3, 4];
    comparators.compare(numbers, 'ascending').then(() => done());
  });
});
