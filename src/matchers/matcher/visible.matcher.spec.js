import visibleMatcher from './visible.matcher';
import { expect } from 'chai';

describe('Visible matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(visibleMatcher.isSatisfiedBy('f', 'isVisible')).to.equal(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [
      { prefix: 'f', name: 'isNotVisible' },
      { prefix: 'r', name: 'isVisible' }
    ];

    incorrectParameters.forEach((parameter) => expect(visibleMatcher
      .isSatisfiedBy((parameter.prefix, parameter.name))).to.equal(false));
  });

  it('returns true when the element is visible', (done) => {
    const mockedElement = {
      isDisplayed: () => Promise.resolve()
    };

    visibleMatcher.match(mockedElement).then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns false when the element is not visible', (done) => {
    const mockedElement = {
      isDisplayed: () => Promise.reject()
    };

    visibleMatcher.match(mockedElement).then((result) => {
      expect(result).to.equal(false);
      done();
    });
  });
});
