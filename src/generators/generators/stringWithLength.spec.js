const chai = require('chai');
const expect = chai.expect;

const stringWithLength = require('./stringWithLength');

describe('String with length', () => {
  it('returns true if is satisfied by', () => {
    expect(stringWithLength.isSatisfiedBy('stringWithLength')).to.equals(true);
  });

  it('returns false if is not satisfied by', () => {
    expect(stringWithLength.isSatisfiedBy('not-supported-name')).to.equals(false);
  });

  it('generates string with given length', () => {
    expect(stringWithLength.generate(100).length).to.equals(100);
  })
});
