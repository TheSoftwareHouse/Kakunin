import { waitForCondition } from './wait-for-condition.methods';
import config from '../../core/config.helper';
import BasePage from '../../pages/base';

const timeout = parseInt(config.elementsVisibilityTimeout) * 1000;

export const waitForElementCondition = (currentPage: BasePage, condition: string, elementName: string) => {
  if (currentPage.getElement(elementName) instanceof protractor.ElementArrayFinder) {
    return waitForCondition(condition, timeout)(currentPage.getElement(elementName).first());
  }

  return waitForCondition(condition, timeout)(currentPage.getElement(elementName));
};

export const waitForElementDisappear = (currentPage: BasePage, elementName: string, sync) => {
  let maxRepeats = 10;

  const interval = setInterval(() => {
    console.log('Waiting for element to disappear...');

    return currentPage.isPresent(elementName).then(isPresent => {
      if (!isPresent) {
        clearInterval(interval);
        sync();
        return;
      }

      maxRepeats--;

      if (maxRepeats === 0) {
        clearInterval(interval);
        sync('Element is still visible');
      }
    });
  }, 1500);
};
