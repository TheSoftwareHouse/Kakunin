import config from './config.helper';
const globalTimeout = parseInt(config.elementsVisibilityTimeout) * 1000;

export const waitForCondition = (condition, timeout) => {
  return element => {
    if (element instanceof protractor.ElementArrayFinder) {
      return browser.wait(protractor.ExpectedConditions[condition](element.first()), timeout);
    }

    return browser.wait(protractor.ExpectedConditions[condition](element), timeout);
  };
};

export const waitForVisibilityOf = element => {
  return waitForCondition('visibilityOf', globalTimeout)(element);
};

export const waitForInvisibilityOf = element => {
  return waitForCondition('invisibilityOf', globalTimeout)(element);
};
