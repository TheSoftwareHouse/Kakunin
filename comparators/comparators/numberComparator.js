const NumberComparator = {
  isSatisfiedBy: (values) => {
    for(let i=0; i<values.length; i++){
      const currentValue = parseFloat(values[i]);

      if (isNaN(currentValue)) {
        return false;
      }
    }
    return true;
  },

  compare: (values, order) => {
    for (let i = 1; i < values; i++) {
      const previousValue = parseFloat(values[i-1]);
      const currentValue = parseFloat(values[i]);

      if (order === 'ascending') {
        if (previousValue > currentValue) {
          return Promise.reject(`${previousValue} should be lower than ${currentValue}`);
        }
      } else {
        if (previousValue < currentValue) {
          return Promise.reject(`${previousValue} should be higher than ${currentValue}`);
        }
      }
    }
    return Promise.resolve();
  }
};

module.exports = NumberComparator;
