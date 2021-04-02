import { visibleMatcher } from './visible.matcher';

describe('Visible matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(visibleMatcher.isSatisfiedBy('f', 'isVisible')).toEqual(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [
      { prefix: 'f', name: 'isNotVisible' },
      { prefix: 'r', name: 'isVisible' },
    ];

    incorrectParameters.forEach((parameter) =>
      expect(visibleMatcher.isSatisfiedBy(parameter.prefix, parameter.name)).toEqual(false)
    );
  });

  it('returns true when the element is visible', (done) => {
    const mockedElement = {
      isDisplayed: () => Promise.resolve(),
      locator: () => 'some-locator',
    };

    visibleMatcher.match(mockedElement).then((result) => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns rejected promise when the element is not visible', (done) => {
    const mockedElement = {
      isDisplayed: () => Promise.reject(),
      locator: () => 'some-locator',
    };

    visibleMatcher.match(mockedElement).catch((err) => {
      done();
    });
  });
});
