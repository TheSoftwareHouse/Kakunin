import faker from 'faker';

export const personalDataGenerator = {
  isSatisfiedBy: function(name) {
    return name === 'personalData';
  },

  generate: function(options) {
    switch (options[0]) {
      case 'firstName':
        return Promise.resolve(faker.name.firstName());
      case 'lastName':
        return Promise.resolve(faker.name.lastName());
      case 'jobTitle':
        return Promise.resolve(faker.name.jobTitle());
      case 'email':
        return Promise.resolve(faker.internet.email(null, null, options[1]));
      default:
        return Promise.reject('Option not available in "personalData" generator!');
    }
  }
};
