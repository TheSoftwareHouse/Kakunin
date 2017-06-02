import { create } from './generators';

const chai = require('chai');
const expect = chai.expect;

const generators = create();

describe('Generators', () => {
  it('throws an error when no generator was found', () => {
    expect(() => generators.generate('unknown-generator'))
      .to.throw('Could not find generator for unknown-generator.');
  });

  it('return generated value', () => {
    expect(generators.generate('stringWithLength', 100).length).to.equal(100);
  });

  it('adds new generator', () => {
    const customGenerator = {
      isSatisfiedBy: (name) => name === 'customGenerator',
      generate: (params) => {
        return params;
      }
    };

    generators.addGenerator(customGenerator);

    expect(generators.generate('customGenerator', 'params')).to.equal('params');
  })
});
