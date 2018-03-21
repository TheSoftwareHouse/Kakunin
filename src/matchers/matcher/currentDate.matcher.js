import Sugar from 'sugar-date';

class CurrentDateMatcher {
  isSatisfiedBy(prefix, name) {
    return prefix === 'f' && name === 'currentDate';
  }

  match(element) {
    let currentDate = Sugar.Date.create('now');
    currentDate = Sugar.Date.format(currentDate, '{yyyy}-{MM}-{dd}');

    return element.getText().then((text) => {
      let compareDate = Sugar.Date.create(text);
      compareDate = Sugar.Date.format(compareDate, '{yyyy}-{MM}-{dd}');

      if (compareDate === currentDate) {
        return true;
      } else {
        return false;
      }
    });
  }
}

export const currentDateMatcher = new CurrentDateMatcher();
