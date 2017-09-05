'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class RadioHandler {
  isSatisfiedBy(element, elementName) {
    return element.getTagName().then(function (tagName) {
      if (tagName === 'input') {
        return element.getAttribute('type').then(inputType => inputType === 'radio');
      }

      if (tagName instanceof Array) {
        return element.first().getAttribute('type').then(inputType => inputType === 'radio');
      }

      return false;
    });
  }

  handleFill(page, elementName, desiredValue) {
    const firstRadio = page[elementName].filter(function (elem) {
      return elem.getAttribute('value').then(function (elemValue) {
        return elemValue === desiredValue;
      });
    }).first();

    return firstRadio.isDisplayed().then(function (isDisplayed) {
      if (isDisplayed) {
        return firstRadio.click();
      }

      return firstRadio.element(by.xpath('..')).click();
    });
  }

  handleCheck(page, elementName, desiredValue) {
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

      return filteredElements.first().getAttribute('value').then(function (value) {
        if (value === desiredValue) {
          return Promise.resolve();
        }

        return Promise.reject(`Expected ${desiredValue} got ${value} for radio element ${elementName}`);
      });
    });
  }

  getPriority() {
    return 998;
  }
}

const radioHandler = exports.radioHandler = new RadioHandler();