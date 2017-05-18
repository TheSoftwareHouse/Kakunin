const modulesLoader = require('../helpers/modulesLoader').create({
  projectPath: process.cwd()
});

const chai = require('chai');
const expect = chai.expect;

const comparators = require('./comparators').create(modulesLoader);

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
