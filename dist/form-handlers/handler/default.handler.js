'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class DefaultHandler {
  isSatisfiedBy(element, elementName) {
    return Promise.resolve(true);
  }

  handleFill(page, elementName, desiredValue) {
    return page[elementName].isDisplayed().then(function () {
      return page[elementName].clear().then(function () {
        return page[elementName].sendKeys(desiredValue);
      });
    });
  }

  handleCheck(page, elementName, desiredValue) {
    return page[elementName].isDisplayed().then(function () {
      return page[elementName].getAttribute('value').then(function (value) {
        if (value === desiredValue) {
          return Promise.resolve();
        }

        return Promise.reject(`Expected ${desiredValue} got ${value} for text input element ${elementName}`);
      });
    });
  }

  getPriority() {
    return 999;
  }
}

const defaultHandler = exports.defaultHandler = new DefaultHandler();