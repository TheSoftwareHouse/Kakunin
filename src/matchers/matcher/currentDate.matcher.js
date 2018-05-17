import Sugar from 'sugar-date';

class CurrentDateMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'currentDate';
  }

  match(element, dateFormat = '{dd}-{MM}-{yyyy}') {
    const currentDate = Sugar.Date.format(Sugar.Date.create('now'), dateFormat);

    return element.getText().then((text) => {
      const compareDate = Sugar.Date.format(Sugar.Date.create(text), dateFormat);
      return (compareDate === currentDate) ? true : false;
    }).catch(false);
  }
}

export const currentDateMatcher = new CurrentDateMatcher();
