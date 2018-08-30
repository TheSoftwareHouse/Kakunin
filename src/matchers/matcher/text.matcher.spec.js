import { textMatcher } from './text.matcher';

describe('Text matcher', () => {
  it('is satisfied when the prefix is correct', () => {
    expect(textMatcher.isSatisfiedBy('t')).toEqual(true);
  });

  it('is not satisfied when the prefix is incorrect', () => {
    expect(textMatcher.isSatisfiedBy('r')).toEqual(false);
  });

  it('returns true when the text is matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('this string contains message'),
      locator: () => 'some-locator'
    };

    textMatcher.match(elementMocked, 'message').then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns rejected promise when the text is not matched', (done) => {
    const elementMocked = {
      getText: () => Promise.resolve('missing expected value in string'),
      locator: () => 'some-locator'
    };

    textMatcher.match(elementMocked, 'message').catch((err) => {
      done();
    });
  });
});
