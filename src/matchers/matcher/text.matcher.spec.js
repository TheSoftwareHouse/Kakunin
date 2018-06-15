import { textMatcher } from './text.matcher';
import { expect } from 'chai';

describe('Text matcher', () => {
  it('is satisfied when the prefix is correct', () => {
    expect(textMatcher.isSatisfiedBy('t')).to.equal(true);
  });

  it('is not satisfied when the prefix is incorrect', () => {
    expect(textMatcher.isSatisfiedBy('r')).to.equal(false);
  });

  it('returns true when the text is matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('this string contains message'),
      locator: () => 'some-locator'
    };

    textMatcher.match(elementMocked, 'message').then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns false when the text is not matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('missing expected value in string'),
      locator: () => 'some-locator'
    };

    textMatcher.match(elementMocked, 'message').catch((err) => {
      done();
    });
  });
});
