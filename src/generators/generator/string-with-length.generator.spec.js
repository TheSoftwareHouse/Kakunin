import { stringWithLengthGenerator } from './string-with-length.generator';

const chai = require('chai');
const expect = chai.expect;

describe('String with length', () => {
  it('returns true if is satisfied by', () => {
    expect(stringWithLengthGenerator.isSatisfiedBy('stringWithLength')).to.equals(true);
  });

  it('returns false if is not satisfied by', () => {
    expect(stringWithLengthGenerator.isSatisfiedBy('not-supported-name')).to.equals(false);
  });

  it('generates string with given length', () => {
    expect(stringWithLengthGenerator.generate(100).length).to.equals(100);
  })
});
