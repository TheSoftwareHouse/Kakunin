import moment from 'moment';

class CurrentDateMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'currentDate';
  }

  // eslint-disable-next-line no-unused-vars
  match(element, name = null, params = 'DD-MM-YYYY') {
    const currentDate = moment(new Date()).format(params);
    return element.getText().then(text => {
      const compareDate = moment(new Date(text)).format(params);

      if (compareDate === currentDate) {
        return true;
      }

      /* eslint-disable max-len */
      return Promise.reject(`
        Matcher "CurrentDate" could not match date for element "${element.locator()}". Expected: "${compareDate}", given: "${currentDate}".
      `);
      /* eslint-enable max-len */
    });
  }
}

export const currentDateMatcher = new CurrentDateMatcher();
