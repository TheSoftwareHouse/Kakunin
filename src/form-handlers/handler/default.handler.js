class DefaultHandler {
  isSatisfiedBy() {
    return Promise.resolve(true);
  }

  handleFill(page, elementName, desiredValue) {
    return page[elementName].isDisplayed()
      .then(function () {
        return page[elementName].clear().then(function () {
          return page[elementName].sendKeys(desiredValue);
        });
      });
  }

  handleCheck(page, elementName, desiredValue) {
    return page[elementName].isDisplayed()
      .then(function () {
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

export const defaultHandler = new DefaultHandler();
