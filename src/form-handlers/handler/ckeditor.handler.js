class CKEditorHandler {
  isSatisfiedBy(element, elementName) {
    return Promise.resolve(elementName.endsWith('CKEditor'));
  }

  handleFill(page, elementName, desiredValue) {
    browser.switchTo().frame(page[elementName].getWebElement());

    browser.driver.findElement(by.tagName('body')).sendKeys(desiredValue);

    browser.switchTo().defaultContent();

    return browser.waitForAngular();
  }

  // eslint-disable-next-line no-unused-vars
  handleCheck(page, elementName, desiredValue) {
    return Promise.reject('Checking CKEditor is not supported');
  }

  getPriority() {
    return 998;
  }
}

export const ckEditorHandler = new CKEditorHandler();
