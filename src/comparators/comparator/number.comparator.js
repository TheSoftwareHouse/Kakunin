export const NumberComparator = {
  isSatisfiedBy: (values) => {
    for (let i = 0; i < values.length; i++) {
      const value = Number(values[i]);
      if (isNaN(value)) {
        return false;
      }
    }
    return true;
  },

  compare: (values, order) => {
    for (let i = 1; i < values.length; i++) {
      const previousValue = Number(values[i - 1]);
      const currentValue = Number(values[i]);

      if (isNaN(previousValue) || isNaN(currentValue)) {
        return Promise.reject(`${values[i - 1]} and ${values[i]} cannot be NaN after conversion to Number`);
      }

      if (order === 'ascending') {
        if (previousValue > currentValue) {
          return Promise.reject(`${previousValue} should be lower than ${currentValue}`);
        }
      } else if (previousValue < currentValue) {
        return Promise.reject(`${previousValue} should be higher than ${currentValue}`);
      }
    }
    return Promise.resolve();
  }
};
