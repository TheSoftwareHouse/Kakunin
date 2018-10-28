import { notClickableMatcher } from './not-clickable.matcher';

describe('Not clickable matcher', () => {
  it('is satisfied when the prefix and the name are correct', () => {
    expect(notClickableMatcher.isSatisfiedBy('f', 'isNotClickable')).toEqual(true);
  });

  it('is not satisfied when unsupported parameters are given', () => {
    const incorrectParameters = [{ prefix: 'r', name: 'isNotClickable' }, { prefix: 'f', name: 'isClickable' }];
    incorrectParameters.forEach(parameter =>
      expect(notClickableMatcher.isSatisfiedBy(parameter.prefix, parameter.name)).toEqual(false)
    );
  });

  it('returns rejected promise when the element is clickable', done => {
    const mockedElement = {
      getAttribute: attribute => Promise.resolve(null),
      locator: () => 'some-locator',
    };

    notClickableMatcher.match(mockedElement).catch(err => {
      done();
    });
  });

  it('returns true when the element is not clickable - disabled with disabled parameter', done => {
    const mockedElement = {
      getAttribute: attribute => Promise.resolve('disabled'),
      locator: () => 'some-locator',
    };

    notClickableMatcher.match(mockedElement).then(result => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns true when the element is not clickable - disabled with true parameter', done => {
    const mockedElement = {
      getAttribute: attribute => Promise.resolve(true),
      locator: () => 'some-locator',
    };

    notClickableMatcher.match(mockedElement).then(result => {
      expect(result).toEqual(true);
      done();
    });
  });

  it('returns true when the element is not clickable - disabled with true string parameter', done => {
    const mockedElement = {
      getAttribute: attribute => Promise.resolve('true'),
      locator: () => 'some-locator',
    };

    notClickableMatcher.match(mockedElement).then(result => {
      expect(result).toEqual(true);
      done();
    });
  });
});
