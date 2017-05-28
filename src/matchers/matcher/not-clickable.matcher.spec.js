import notClickableMatcher from './not-clickable.matcher';
import { expect } from 'chai';

describe('Not clickable matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(notClickableMatcher.isSatisfiedBy('f:', 'isNotClickable')).to.equal(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [
      { prefix: 'r:', name: 'isNotClickable' },
      { prefix: 'f:', name: 'isClickable' }
    ];
    incorrectParameters.forEach((parameter) => expect(notClickableMatcher
      .isSatisfiedBy(parameter.prefix, parameter.name)).to.equal(false));
  });

  it('returns promise resolved when the element is clickable', (done) => {
    const mockedElement = {
      getAttribute: (attribute) => Promise.resolve(null)
    };

    notClickableMatcher.match(mockedElement).then((result) => {
      expect(result).to.equal(false);
      done();
    });
  });

  it('returns false when the element is not clickable - disabled with disabled parameter', (done) => {
    const mockedElement = {
      getAttribute: (attribute) => Promise.resolve('disabled')
    };

    notClickableMatcher.match(mockedElement).then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns true when the element is not clickable - disabled with true parameter', (done) => {
    const mockedElement = {
      getAttribute: (attribute) => Promise.resolve(true)
    }

    notClickableMatcher.match(mockedElement).then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });

  it('returns true when the element is not clickable - disabled with true string parameter', (done) => {
    const mockedElement = {
      getAttribute: (attribute) => Promise.resolve('true')
    }

    notClickableMatcher.match(mockedElement).then((result) => {
      expect(result).to.equal(true);
      done();
    });
  });
});
