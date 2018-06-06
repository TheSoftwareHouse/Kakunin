import moment from 'moment';

class CurrentDateMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'currentDate';
  }

  match(element, name = null, params = 'DD-MM-YYYY') {
    const currentDate = moment(new Date()).format(params);
    return element.getText().then((text) => {
      const compareDate = moment(new Date(text)).format(params);
      return (compareDate === currentDate);
    }).catch(false);
  }
}

export const currentDateMatcher = new CurrentDateMatcher();
