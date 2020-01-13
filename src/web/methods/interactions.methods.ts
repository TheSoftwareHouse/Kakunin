import { waitForCondition } from './wait-for-condition.methods';
import config from '../../core/config.helper';
import BasePage from './../pages/base';
import { ElementFinder } from 'protractor';

const timeout = parseInt(config.elementsVisibilityTimeout) * 1000;

export const click = (currentPage: BasePage, elementName: string | ElementFinder) => {
  return currentPage
    .scrollIntoElement(elementName)
    .catch(() => Promise.resolve())
    .then(() => currentPage.waitForVisibilityOf(elementName))
    .then(() => currentPage.scrollIntoElement(elementName))
    .then(() => currentPage.click(elementName))
    .catch(() => {
      return waitForCondition(
        'elementToBeClickable',
        timeout
      )(currentPage.getElement(elementName)).then(() => {
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

export const infinityScrollTo = (currentPage: BasePage, elementName: string) => {
  return currentPage
    .isPresent(elementName)
    .then(isPresent => {
      if (isPresent) {
        return currentPage.scrollIntoElement(elementName);
      }

      return Promise.resolve();
    })
    .then(() => currentPage.isPresent(elementName))
    .then(isPresent => {
      if (isPresent) {
        return browser.sleep(1000).then(() => infinityScrollTo(currentPage, elementName));
      }

      return Promise.resolve();
    });
};

export const pressKey = (key: string) => {
  const keyTransformed = key.toUpperCase();

  return Promise.resolve(
    browser
      .actions()
      .sendKeys(protractor.Key[keyTransformed])
      .perform()
  );
};

export const pressKeyOnElement = async (currentPage: BasePage, key: string, elementName: string) => {
  const keyTransformed = key.toUpperCase();

  await currentPage.waitForVisibilityOf(elementName);
  return currentPage[elementName].sendKeys(protractor.Key[keyTransformed]);
};

export const dragAndDrop = async (currentPage: BasePage, elementDrag: string, elementDrop: string) => {
  const wait = timeToWait => browser.sleep(timeToWait);

  await currentPage.waitForVisibilityOf(elementDrag);
  await browser
    .actions()
    .mouseMove(currentPage.getElement(elementDrag))
    .perform();
  await wait(200);
  await browser
    .actions()
    .mouseDown()
    .perform();
  await wait(200);
  await browser
    .actions()
    .mouseMove(currentPage.getElement(elementDrop))
    .perform();
  await wait(200);
  await browser
    .actions()
    .mouseUp()
    .perform();
};

export const confirmRecaptcha = (currentPage: BasePage, elementName: string) => {
  const iframeClickArea = '#rc-anchor-container';
  const iframeConfirmation = '#recaptcha-anchor.recaptcha-checkbox-checked';

  return currentPage
    .switchIframe(elementName)
    .then(() => currentPage.click(iframeClickArea))
    .then(() => currentPage.waitForVisibilityOf(iframeConfirmation))
    .then(() => currentPage.switchIframe('default'));
};
