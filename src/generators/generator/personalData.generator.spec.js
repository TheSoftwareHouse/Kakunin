import { personalDataGenerator } from './personalData.generator';

describe('Personal data', () => {
  it('returns true if is satisfied by', () => {
    expect(personalDataGenerator.isSatisfiedBy('personalData')).toEqual(true);
  });

  it('returns false if is not satisfied by', () => {
    expect(personalDataGenerator.isSatisfiedBy('not-supported-name')).toEqual(false);
  });


  it('generates a random firstName', (done) => {
    personalDataGenerator.generate(['firstName']).then(result => {
      expect(result.length > 1 && /[A-Z].*/.test(result)).toEqual(true);
      done();
    })
  });

  it('generates a random lastName', (done) => {
    personalDataGenerator.generate(['lastName']).then(result => {
      expect(result.length > 1 && /[A-Z].*/.test(result)).toEqual(true);
      done();
    })
  });

  it('generates a random jobTitle', (done) => {
    personalDataGenerator.generate(['jobTitle']).then(result => {
      expect(result.length > 1).toEqual(true);
      done();
    })
  });

  it('generates a random email', (done) => {
    personalDataGenerator.generate(['email']).then(result => {
      const minEmailLength = 5;

      expect(result.includes('@') && result.length > minEmailLength).toEqual(true);
      done();
    })
  });

  it('return error message - generator is not available', (done) => {
    personalDataGenerator.generate(['incorrect'])
      .catch(error => {
        expect(error === 'Option not available in "personalData" generator!').toEqual(true);
        done()
      })
  });
});
