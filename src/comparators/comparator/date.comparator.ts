import * as moment from 'moment';

export const supportedFormats = ['DD-MM-YYYY', 'DD-MM-YY', 'DD/MM/YYYY', 'DD/MM/YY'];

const isValidDate = date => {
  for (const format of supportedFormats) {
    if (moment(date, format).isValid()) {
      return true;
    }
  }

  return false;
};

export const DateComparator = {
  isSatisfiedBy: values => {
    for (const date of values) {
      const found = isValidDate(date);

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
      const foundPrevious = moment(
        datePrevious,
        supportedFormats.find(format => moment(datePrevious, format).isValid())
      );
      const found = moment(date, supportedFormats.find(format => moment(date, format).isValid()));

      const previousTimestamp = foundPrevious.unix();
      const currentTimestamp = found.unix();

      if (order === 'ascending') {
        if (currentTimestamp < previousTimestamp) {
          return Promise.reject(`Date ${foundPrevious[1]} should be before ${found[1]}.`);
        }
      } else if (currentTimestamp > previousTimestamp) {
        return Promise.reject(`Date ${found[1]} should be after ${foundPrevious[1]}.`);
      }
    }
    return Promise.resolve();
  },
};
