import { waitForCondition } from './wait-for-condition.methods';
import config from '../../core/config.helper';
import BasePage from '../../pages/base';

const timeout = parseInt(config.elementsVisibilityTimeout) * 1000;

export const click = (currentPage: BasePage, elementName: string) => {
  return currentPage
    .scrollIntoElement(elementName)
    .catch(() => Promise.resolve())
    .then(() => currentPage.waitForVisibilityOf(elementName))
    .then(() => currentPage.scrollIntoElement(elementName))
    .then(() => currentPage.click(elementName))
    .catch(() => {
      return waitForCondition('elementToBeClickable', timeout)(currentPage.getElement(elementName)).then(() => {
        return currentPage.click(elementName);
      });
    })
    .catch(() => {
      console.warn('Warning! Element was not clickable. We need to scroll it down.');
      return browser
        .executeScript('window.scrollBy(0,50);')
        .then(() => currentPage.waitForVisibilityOf(elementName))
        .then(() => currentPage.click(elementName));
    })
    .catch(() => {
      console.warn('Warning! Element was not clickable. We need use the WebDriver method to perform the click action.');
      return browser
        .actions()
        .mouseMove(currentPage.getElement(elementName))
        .mouseMove({ x: 5, y: 0 })
        .click()
        .perform();
    })
    .catch(() => {
      return Promise.reject(`Error, after scrolling the element "${elementName}" is still not clickable.`);
    });
};
