import { create } from './matchers';

const matchers = create();

describe('Matchers', () => {
  it('throws an error when no matcher was found', () => {
    const mockedElement = {};

    expect(() => matchers.match(mockedElement, 'incorrect:unknown-matcher')).toThrow(
      'Could not find matcher for incorrect:unknown-matcher.'
    );
  });

  it('returns true when found a matcher and element value is correct', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('div'),
      getText: () => Promise.resolve('my message'),
    };

    matchers.match(mockedElement, 't:message').then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns true when found a matcher and element value in input field is correct', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('input'),
      getAttribute: () => Promise.resolve('my message'),
    };

    matchers.match(mockedElement, 't:message').then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns true when found a matcher and element value in textarea field is correct', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('textarea'),
      getAttribute: () => Promise.resolve('my message'),
    };

    matchers.match(mockedElement, 't:message').then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns rejected promise when found a matcher and element value is not correct', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('h2'),
      getText: () => Promise.resolve('my message'),
      locator: () => 'some-locator',
    };

    matchers.match(mockedElement, 't:not-existing').catch((err) => {
      done();
    });
  });

  it('returns rejected promise when found a matcher and element value in input field is not correct', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('input'),
      getAttribute: () => Promise.resolve('my message'),
      locator: () => 'some-locator',
    };

    matchers.match(mockedElement, 't:not-existing').catch((err) => {
      done();
    });
  });

  it('returns rejected promise when found a matcher and element value in textarea field is not correct', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('textarea'),
      getAttribute: () => Promise.resolve('my message'),
      locator: () => 'some-locator',
    };

    matchers.match(mockedElement, 't:not-existing').catch((err) => {
      done();
    });
  });

  it('returns true when found a matcher and element value after a first colon sign is correct', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('p'),
      getText: () => Promise.resolve('my message: contains :colons'),
      locator: () => 'some-locator',
    };

    matchers.match(mockedElement, 't:contains :colons').then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns true when found a matcher and element value after a first colon sign is correct - input field of the element', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('input'),
      getAttribute: () => Promise.resolve('my message: contains :colons'),
      locator: () => 'some-locator',
    };

    matchers.match(mockedElement, 't:contains :colons').then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns true when found a matcher and element value after a first colon sign is correct - textarea field of the element', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('textarea'),
      getAttribute: () => Promise.resolve('my message: contains :colons'),
      locator: () => 'some-locator',
    };

    matchers.match(mockedElement, 't:contains :colons').then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns rejected promise when found a matcher but a text after colon sign is incorrect', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('td'),
      getText: () => Promise.resolve('my message: contains :colons'),
      locator: () => 'some-locator',
    };

    matchers.match(mockedElement, 't:my message: contains :incorrect').catch((err) => {
      done();
    });
  });

  it('returns rejected promise when found a matcher but a text after colon sign is incorrect - input field of the element', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('input'),
      getAttribute: () => Promise.resolve('my message: contains :colons'),
      locator: () => 'some-locator',
    };

    matchers.match(mockedElement, 't:my message: contains :incorrect').catch((err) => {
      done();
    });
  });

  it('returns rejected promise when found a matcher but a text after colon sign is incorrect - textarea field of the element', (done) => {
    const mockedElement = {
      getTagName: () => Promise.resolve('textarea'),
      getAttribute: () => Promise.resolve('my message: contains :colons'),
      locator: () => 'some-locator',
    };

    matchers.match(mockedElement, 't:my message: contains :incorrect').catch((err) => {
      done();
    });
  });
});
