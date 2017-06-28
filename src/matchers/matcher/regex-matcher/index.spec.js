import regexMatcher from './index';
import { expect } from 'chai';

describe('Regex matcher', () => {
  it('is satisfied when the prefix is correct and regex exists', () => {
    expect(regexMatcher.isSatisfiedBy('r', 'number')).to.equal(true);
  });

  it('is not satisfied when the prefix is incorrect', () => {
    expect(regexMatcher.isSatisfiedBy('f', 'number')).to.equal(false);
  });

  it('is not satisfied when the name is not incorrect', () => {
    expect(regexMatcher.isSatisfiedBy('r', 'unknown')).to.equal(false);
  });

  it('returns matches text of element', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('12345'),
      getAttribute: (name) => (name === 'value') ? Promise.resolve('') : Promise.resolve(null)
    };

    regexMatcher.match(elementMocked, 'number').then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('matches value attribute if text is empty', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve(''),
      getAttribute: (name) => (name === 'value') ? Promise.resolve('12345') : Promise.resolve(null)
    };

    regexMatcher.match(elementMocked, 'number').then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns false when the text is not matching', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('not-a-number'),
      getAttribute: (name) => (name === 'value') ? Promise.resolve('') : Promise.resolve(null)
    };

    regexMatcher.match(elementMocked, 'number').then((result) => {
      expect(result).to.equal(false);
      done();
    });
  });

  it('returns false when the value attribute is not matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve(''),
      getAttribute: (name) => (name === 'value') ? Promise.resolve('not-a-number') : Promise.resolve(null)
    };

    regexMatcher.match(elementMocked, 'number').then((result) => {
      expect(result).to.equal(false);
      done();
    });
  });

  it('returns false when the text and attribute are empty', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve(''),
      getAttribute: () => Promise.resolve(null)
    };

    regexMatcher.match(elementMocked, 'notEmpty').then((result) => {
      expect(result).to.equal(false);
      done();
    });
  });
});
