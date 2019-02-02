class DefaultHandler {
  public isSatisfiedBy() {
    return Promise.resolve(true);
  }

  public handleFill(page, elementName, desiredValue) {
    return page[elementName]
      .isDisplayed()
      .then(() => page[elementName].clear())
      .then(() => page[elementName].sendKeys(desiredValue));
  }

  public handleCheck(page, elementName, desiredValue) {
    return page[elementName].isDisplayed().then(() => {
      return page[elementName].getAttribute('value').then(value => {
        if (value === desiredValue) {
          return Promise.resolve();
        }

        return Promise.reject(`Expected ${desiredValue} got ${value} for text input element ${elementName}`);
      });
    });
  }

  public getPriority() {
    return 999;
  }
}

export const defaultHandler = new DefaultHandler();
