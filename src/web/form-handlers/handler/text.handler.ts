import { FormHandler } from '../form-handler.interface';

class TextHandler implements FormHandler {
  public readonly type = 'text';

  public isSatisfiedBy() {
    return Promise.resolve(true);
  }

  public handleFill(page, elementName, desiredValue) {
    return page
      .getElement(elementName)
      .isDisplayed()
      .then(() => page.getElement(elementName).clear())
      .then(() => page.getElement(elementName).sendKeys(desiredValue));
  }

  public handleCheck(page, elementName, desiredValue) {
    return page
      .getElement(elementName)
      .isDisplayed()
      .then(() => {
        return page
          .getElement(elementName)
          .getAttribute('value')
          .then(value => {
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

export const textHandler = new TextHandler();
