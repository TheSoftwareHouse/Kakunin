import config from './config.helper';
const timeout = parseInt(config.elementsVisibilityTimeout) * 1000;

export const waitForVisibilityOf = (elementName) => {
  return waitForCondition('visibilityOf', timeout)(elementName);
};

export const waitForInvisibilityOf = (elementName) => {
  return waitForCondition('invisibilityOf', timeout)(elementName);
};

export const waitForCondition = (condition, timeout) => {
  return element => {
    if (element instanceof protractor.ElementArrayFinder) {
      return browser.wait(protractor.ExpectedConditions[condition](element.first()), timeout);
    }

    return browser.wait(protractor.ExpectedConditions[condition](element), timeout);
  }
};
