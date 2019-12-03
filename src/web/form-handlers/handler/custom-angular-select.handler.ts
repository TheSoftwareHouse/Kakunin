import { FormHandler } from '../form-handler.interface';

class CustomAngularSelectHandler implements FormHandler {
  public readonly type = 'customAngularSelect';
  private selectedOptionSelector: object;
  private optionsSelector: object;

  constructor() {
    this.optionsSelector = by.css('ul.ui-select-choices li a.ui-select-choices-row-inner');
    this.selectedOptionSelector = by.css('div.ui-select-match .ui-select-match-text');
  }

  public isSatisfiedBy(element, elementName) {
    return Promise.resolve(elementName.endsWith('CustomAngularSelect'));
  }

  public handleFill(page, elementName, desiredValue) {
    return browser
      .executeScript('arguments[0].scrollIntoView(false);', page[elementName].getWebElement())
      .then(() => page[elementName].click())
      .then(() => {
        const filtered = page[elementName]
          .all(this.optionsSelector)
          .filter(elem => elem.getText().then(text => text === desiredValue));

        return filtered.count().then(count => {
          if (count === 0) {
            return page[elementName]
              .all(this.optionsSelector)
              .first()
              .click();
          }

          return filtered.first().click();
        });
      });
  }

  public handleCheck(page, elementName, desiredValue) {
    return page[elementName]
      .element(this.selectedOptionSelector)
      .getText()
      .then(text => {
        if (text === desiredValue) {
          return Promise.resolve();
        }

        return Promise.reject(`Expected ${desiredValue} got ${text} for select element ${elementName}`);
      });
  }

  public getPriority() {
    return 998;
  }
}

export const customAngularSelectHandler = new CustomAngularSelectHandler();
