import { presentMatcher } from './present.matcher';

describe('Present matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(presentMatcher.isSatisfiedBy('f', 'isPresent')).toEqual(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [
      { prefix: 'f', name: 'isVisible'},
      { prefix: 'r', name: 'isPresent'}
    ];

    incorrectParameters.forEach((parameter) => expect(presentMatcher
      .isSatisfiedBy(parameter.prefix, parameter.name)).toEqual(false));
  });

  it('returns true when the element is present', (done) => {
    const mockedElement = {
      isPresent: () => Promise.resolve(),
      locator: () => 'some-locator'
    };

    presentMatcher.match(mockedElement).then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns rejected promise when the element is not present', (done) => {
    const mockedElement = {
      isPresent: () => Promise.reject(),
      locator: () => 'some-locator'
    };

    presentMatcher.match(mockedElement).catch((err) => {
      done();
    });
  });
});
