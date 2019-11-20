import { When, Then } from 'cucumber';
import config from '../core/config.helper';
import { existsSync } from 'fs';
import { resolve } from 'path';

const diffExists = screenshotName => {
  if (
    existsSync(
      resolve(
        process.cwd(),
        `${config.temporaryFolder}/diff`,
        `${screenshotName}-${config.browserWidth}x${config.browserHeight}.png`
      )
    )
  ) {
    return Promise.reject(`File "${screenshotName}" in the baseline is different! Check "diff" catalog.`);
  }
  return Promise.resolve;
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
  await browser.imageComparison.checkElement(this.currentPage.getElement(elementName), screenshotName).then(() => {
    diffExists(screenshotName);
  });
});

Then(/^I compare the screenshot of visible the part of the page saved as "([^"]*)"$/, async screenshotName => {
  await browser.imageComparison.checkScreen(screenshotName).then(() => {
    diffExists(screenshotName);
  });
});

Then(/^I compare the full screenshot of the page  saved as "([^"]*)"$/, async screenshotName => {
  await browser.imageComparison.checkFullPageScreen(screenshotName).then(() => {
    diffExists(screenshotName);
  });
});
