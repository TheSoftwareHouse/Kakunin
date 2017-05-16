const regex = require('../../matchers/matchers/regexMatcher/regex');
const dateFromString = regex.StandardDateFormat;

const DateComparator = {
  isSatisfiedBy: (values) => {
    for (let i = 0; i < values.length; i++) {
      const date = values[i];
      const found = date.match(dateFromString);

      if (!found) {
        return false;
      }
    }
    return true;
  },

  compare: (values, order) => {
    for (let i = 1; i < values.length; i++) {
      const datePrevious = values[i - 1];
      const date = values[i];
      const foundPrevious = datePrevious.match(dateFromString);
      const found = date.match(dateFromString);


      const previousTimestamp = new Date(foundPrevious[1]).getTime();
      const currentTimestamp = new Date(found[1]).getTime();

      if (order === 'ascending') {
        if (currentTimestamp < previousTimestamp) {
          return Promise.reject(`Date ${foundPrevious[1]} should be before ${found[1]}.`);
        }
      } else if (currentTimestamp > previousTimestamp) {
        return Promise.reject(`Date ${found[1]} should be after ${foundPrevious[1]}.`);
      }
    }
    return Promise.resolve();
  }
};

module.exports = DateComparator;
