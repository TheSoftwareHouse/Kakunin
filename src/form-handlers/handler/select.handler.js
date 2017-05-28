const SelectHandler = {

  registerFieldType: false,
  fieldType: 'select',
  optionsSelector: by.css('option'),

  handleFill: function (page, elementName, desiredValue) {
    const self = this;

    const filteredByText = page[elementName].all(this.optionsSelector).filter(function (elem) {
      return elem.getText().then(function (text) {
        return text.trim() === desiredValue;
      });
    });

    return filteredByText.count().then((filteredByTextCount) => {
      if (filteredByTextCount === 0) {
        const filteredByValue = page[elementName].all(by.css('option')).filter(function (elem) {
          return elem.getAttribute('value').then(function (elemValue) {
            return elemValue === desiredValue;
          });
        });

        return filteredByValue.count().then(function (filteredByValueCount) {
          if (filteredByValueCount === 0) {
            return page[elementName].all(self.optionsSelector).first().click();
          }

          return filteredByValue.first().click();
        });
      }

      return filteredByText.first().click();
    });
  },

  handleCheck: function (page, elementName, desiredValue) {
    return page[elementName].all(this.optionsSelector).filter(function (element) {
      return element.getAttribute('value').then(function (elemValue) {
        return elemValue === desiredValue;
      });
    }).count().then(function (count) {
      if (count === 1) {
        return Promise.resolve();
      }

      return Promise.reject('Option not found for select element.');
    });
  }
};

export const selectHandler = SelectHandler;
