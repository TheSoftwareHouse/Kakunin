import { textMatcher } from './text.matcher';

describe('Text matcher', () => {
  it('is satisfied when the prefix is correct', () => {
    expect(textMatcher.isSatisfiedBy('t')).toEqual(true);
  });

  it('is not satisfied when the prefix is incorrect', () => {
    expect(textMatcher.isSatisfiedBy('r')).toEqual(false);
  });

  it('returns true when the text is matched - different tag than textarea and input', done => {
    const elementMocked = {
      getTagName: () => Promise.resolve('div'),
      getText: () => Promise.resolve('this string contains message'),
      locator: () => 'some-locator',
    };

    textMatcher.match(elementMocked, 'message').then(result => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns true when the text from textarea is matched', done => {
    const elementMocked = {
      getTagName: () => Promise.resolve('textarea'),
      getAttribute: () => Promise.resolve('this string contains message from textarea'),
      locator: () => 'some-locator',
    };

    textMatcher.match(elementMocked, 'message from textarea').then(result => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns true when the text from input is matched', done => {
    const elementMocked = {
      getTagName: () => Promise.resolve('textarea'),
      getAttribute: () => Promise.resolve('this string contains message from input'),
      locator: () => 'some-locator',
    };

    textMatcher.match(elementMocked, 'message from input').then(result => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns rejected promise when the text is not matched - different tag than textarea and input', done => {
    const elementMocked = {
      getTagName: () => Promise.resolve('h4'),
      getText: () => Promise.resolve('missing expected value in string'),
      locator: () => 'some-locator',
    };

    textMatcher.match(elementMocked, 'message').catch(err => {
      expect(err).toEqual(`
          Matcher "TextMatcher" could not match value on element "some-locator".
          Expected: "message", Given: "missing expected value in string"
        `);
      done();
    });
  });

  it('returns rejected promise when the text is not matched in input field', done => {
    const elementMocked = {
      getTagName: () => Promise.resolve('input'),
      getAttribute: () => Promise.resolve('missing expected value in input string'),
      locator: () => 'some-locator',
    };

    textMatcher.match(elementMocked, 'message').catch(err => {
      expect(err).toContain('Expected: "message", Given: "missing expected value in input string"');
      done();
    });
  });

  it('returns rejected promise when the text is not matched in textarea field', done => {
    const elementMocked = {
      getTagName: () => Promise.resolve('textarea'),
      getAttribute: () => Promise.resolve('missing expected value in textarea string'),
      locator: () => 'some-locator',
    };

    textMatcher.match(elementMocked, 'message').catch(err => {
      expect(err).toContain('Matcher "TextMatcher" could not match value on element "some-locator".');
      done();
    });
  });
});
