import { When, Then } from 'cucumber';
import config from '../core/config.helper';
import { promises as fsPromises } from 'fs';
import { resolve } from 'path';

const diffExists = screenshotName => {
  return fsPromises
    .access(
      resolve(
        `${config.imageComparator.temporaryFolder}/diff`,
        `${screenshotName}-${config.browserWidth}x${config.browserHeight}.png`
      )
    )
    .then(() =>
      Promise.reject(
        `Check "diff" catalog. Devation tolerance was bigger then: ${config.imageComparator.saveAboveTolerance}%`
      )
    )
    .catch(() => Promise.resolve());
};

When(/^I take screenshot of the element "([^"]*)" and save as a "([^"]*)"$/, function(elementName, screenshotName) {
  return browser.imageComparison.saveElement(this.currentPage.getElement(elementName), screenshotName);
});

When(/^I take screenshot of the visible part of the page and save as a "([^"]*)"$/, screenshotName => {
  return browser.imageComparison.saveScreen(screenshotName);
});

When(/^I take full screenshot of the page and save as a "([^"]*)"$/, screenshotName => {
  return browser.imageComparison.saveFullPageScreen(screenshotName);
});

Then(/^I compare the screenshot of the element "([^"]*)" saved as "([^"]*)"$/, function(elementName, screenshotName) {
  return browser.imageComparison
    .checkElement(this.currentPage.getElement(elementName), screenshotName)
    .then(() => diffExists(screenshotName));
});

Then(/^I compare the screenshot of visible the part of the page saved as "([^"]*)"$/, screenshotName => {
  return browser.imageComparison.checkScreen(screenshotName).then(() => diffExists(screenshotName));
});

Then(/^I compare the full screenshot of the page  saved as "([^"]*)"$/, screenshotName => {
  return browser.imageComparison.checkFullPageScreen(screenshotName).then(() => diffExists(screenshotName));
});
