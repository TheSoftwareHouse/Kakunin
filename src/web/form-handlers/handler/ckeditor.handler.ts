import { FormHandler } from '../form-handler.interface';

class CKEditorHandler implements FormHandler {
  public readonly type = 'CKEditor';

  public isSatisfiedBy(element, elementName) {
    return Promise.resolve(elementName.endsWith('CKEditor'));
  }

  public handleFill(page, elementName, desiredValue) {
    browser.switchTo().frame(page[elementName].getWebElement());

    browser.driver.findElement(by.tagName('body')).sendKeys(desiredValue);

    browser.switchTo().defaultContent();

    return browser.waitForAngular();
  }

  public handleCheck(page, elementName, desiredValue) {
    return Promise.reject('Checking CKEditor is not supported');
  }

  public getPriority() {
    return 998;
  }
}

export const ckEditorHandler = new CKEditorHandler();
