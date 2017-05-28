'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const DefaultHandler = {

  registerFieldType: false,
  fieldType: 'default',

  handleFill: function (page, elementName, desiredValue) {
    return page[elementName].isDisplayed().then(function () {
      return page[elementName].clear().then(function () {
        return page[elementName].sendKeys(desiredValue);
      });
    });
  },

  handleCheck: function (page, elementName, desiredValue) {
    return page[elementName].isDisplayed().then(function () {
      return page[elementName].getAttribute('value').then(function (value) {
        if (value === desiredValue) {
          return Promise.resolve();
        }

        return Promise.reject(`Expected ${desiredValue} got ${value} for text input element ${elementName}`);
      });
    });
  }
};

const defaultHandler = exports.defaultHandler = DefaultHandler;