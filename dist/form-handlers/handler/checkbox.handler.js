'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const CheckboxHandler = {

  registerFieldType: false,
  fieldType: 'checkbox',

  handleFill: function (page, elementName, desiredValue) {
    return page[elementName].filter(function (elem) {
      return elem.element(by.xpath('..')).getText().then(function (text) {
        return text === desiredValue;
      });
    }).first().click();
  },

  handleCheck: function (page, elementName, desiredValue) {
    const filteredElements = page[elementName].filter(function (element) {
      return element.isSelected();
    });

    return filteredElements.count().then(function (count) {
      if (desiredValue === '') {
        if (count === 0) {
          return Promise.resolve();
        }

        return Promise.reject(`Expected count to be 0 got ${count}`);
      }

      return page[elementName].filter(function (element) {
        return element.element(by.xpath('..')).getText().then(function (text) {
          return text === desiredValue;
        });
      }).first().isSelected().then(function (selected) {
        if (selected) {
          return Promise.resolve();
        }

        return Promise.reject(`Expected element ${elementName} to be selected`);
      });
    });
  }
};

const checkboxHandler = exports.checkboxHandler = CheckboxHandler;