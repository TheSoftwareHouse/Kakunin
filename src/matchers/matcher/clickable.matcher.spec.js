import { clickableMatcher } from './clickable.matcher';
import { expect } from 'chai';

describe('Clickable matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(clickableMatcher.isSatisfiedBy('f', 'isClickable')).to.equal(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [
      { prefix: 'r', name: 'isClickable' },
      { prefix: 'f', name: 'isNotClickable' }
    ];
    incorrectParameters.forEach((parameter) => expect(clickableMatcher
      .isSatisfiedBy(parameter.prefix, parameter.name)).to.equal(false));
  });

  it('returns true when the element is clickable', (done) => {
    const mockedElement = {
      getAttribute: (attribute) => Promise.resolve(null),
      locator: () => 'some-locator'
    };

    clickableMatcher.match(mockedElement).then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns rejected promise when the element is not clickable - disabled with disabled parameter', (done) => {
    const mockedElement = {
      getAttribute: (attribute) => Promise.resolve('disabled'),
      locator: () => 'some-locator'
    };

    clickableMatcher.match(mockedElement).catch((err) => {
      done();
    });
  });

  it('returns rejected promise when the element is not clickable - disabled with true parameter', (done) => {
    const mockedElement = {
      getAttribute: (attribute) => Promise.resolve(true),
      locator: () => 'some-locator'
    };

    clickableMatcher.match(mockedElement).catch((err) => {
      done();
    });
  });

  it('returns rejected promise when the element is not clickable - disabled with true string parameter', (done) => {
    const mockedElement = {
      getAttribute: (attribute) => Promise.resolve('true'),
      locator: () => 'some-locator'
    };

    clickableMatcher.match(mockedElement).catch((err) => {
      done();
    });
  });


});
