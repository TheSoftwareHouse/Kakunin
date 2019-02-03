export const NumberComparator = {
  isSatisfiedBy: values => {
    for (const value of values) {
      const numberValue = Number(value);
      if (Number.isNaN(numberValue)) {
        return false;
      }
    }
    return true;
  },

  compare: (values, order) => {
    for (let i = 1; i < values.length; i++) {
      const previousValue = Number(values[i - 1]);
      const currentValue = Number(values[i]);

      if (Number.isNaN(previousValue) || Number.isNaN(currentValue)) {
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
  },
};
