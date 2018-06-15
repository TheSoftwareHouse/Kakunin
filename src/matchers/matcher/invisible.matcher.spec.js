import { invisibleMatcher } from './invisible.matcher';
import { expect } from 'chai';

describe('Invisible matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(invisibleMatcher.isSatisfiedBy('f', 'isNotVisible')).to.equal(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [
      { prefix: 'f', name: 'isVisible' },
      { prefix: 't', name: 'isNotVisible' }
    ];
    incorrectParameters.forEach((parameter) => expect(invisibleMatcher
      .isSatisfiedBy(parameter.prefix, parameter.name)).to.equal(false))
  });

  it('returns rejected promise when the element is visible', (done) => {
    const mockedElement = {
      isDisplayed: () => Promise.resolve(true),
      locator: () => 'some-locator'
    };

    invisibleMatcher.match(mockedElement).catch(() => {
      done();
    });
  });

  it('returns true when the element is not visible', (done) => {
    const mockedElement = {
      isDisplayed: () => Promise.reject(),
      locator: () => 'some-locator'
    };

    invisibleMatcher.match(mockedElement).then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });
});
