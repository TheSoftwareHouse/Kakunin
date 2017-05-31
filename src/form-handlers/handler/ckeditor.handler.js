const CKEditorHandler = {

  registerFieldType: true,
  fieldType: 'CKEditor',

  handleFill: function (page, elementName, desiredValue) {
    browser.switchTo().frame(page[elementName].getWebElement());

    browser.driver.findElement(by.tagName('body')).sendKeys(desiredValue);

    browser.switchTo().defaultContent();

    return browser.waitForAngular();
  },

  handleCheck: function (page, elementName, desiredValue) {
    return Promise.reject('Checking CKEditor is not supported');
  }
};

export const ckEditorHandler = CKEditorHandler;
