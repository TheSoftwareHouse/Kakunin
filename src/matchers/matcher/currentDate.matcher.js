import Sugar from 'sugar-date';

class CurrentDateMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'm' && name === 'currentDate';
  }

  match(element) {
    const currentDate = Sugar.Date.format(Sugar.Date.create('now'), '{yyyy}-{MM}-{dd}');
    return element.getText().then((text) => {
      const compareDate = Sugar.Date.format(Sugar.Date.create(text), '{yyyy}-{MM}-{dd}');
      return (compareDate === currentDate) ? true : false;
    }).catch(false);
  }
}

export const currentDateMatcher = new CurrentDateMatcher();
