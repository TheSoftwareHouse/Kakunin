import { When, Then } from 'cucumber';
import config from '../core/config.helper';
import { access } from 'fs';
import { promisify } from 'util';
import * as path from 'path';

const diffExists = async screenshotName => {
  const accessPromise = promisify(access);
  return accessPromise(
    path.resolve(
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

When(/^I take screenshot of the element "([^"]*)" and save as a "([^"]*)"$/, async function(
  elementName,
  screenshotName
) {
  await browser.imageComparison.saveElement(this.currentPage.getElement(elementName), screenshotName);
});

When(/^I take screenshot of the visible part of the page and save as a "([^"]*)"$/, async screenshotName => {
  await browser.imageComparison.saveScreen(screenshotName);
});

When(/^I take full screenshot of the page and save as a "([^"]*)"$/, async screenshotName => {
  await browser.imageComparison.saveFullPageScreen(screenshotName);
});

Then(/^I compare the screenshot of the element "([^"]*)" saved as "([^"]*)"$/, async function(
  elementName,
  screenshotName
) {
  await browser.imageComparison
    .checkElement(this.currentPage.getElement(elementName), screenshotName)
    .then(() => diffExists(screenshotName));
});

Then(/^I compare the screenshot of visible the part of the page saved as "([^"]*)"$/, async screenshotName => {
  await browser.imageComparison.checkScreen(screenshotName).then(() => diffExists(screenshotName));
});

Then(/^I compare the full screenshot of the page  saved as "([^"]*)"$/, async screenshotName => {
  await browser.imageComparison.checkFullPageScreen(screenshotName).then(() => diffExists(screenshotName));
});
