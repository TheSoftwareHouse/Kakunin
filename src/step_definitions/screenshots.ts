const { Then } = require('cucumber');

Then(/^I take screenshot of the element "([^"]*)" and save as a "([^"]*)"$/, async function(
  elementName,
  screenshotName
) {
  await browser.imageComparison.saveElement(this.currentPage.getElement(elementName), screenshotName);
});

Then(/^I take screenshot of the visible part of the page and save as a "([^"]*)"$/, async screenshotName => {
  await browser.imageComparison.saveScreen(screenshotName);
});

Then(/^I take full screenshot of the page and save as a "([^"]*)"$/, async screenshotName => {
  await browser.imageComparison.saveFullPageScreen(screenshotName);
});

Then(/^I compare the screenshot of the element "([^"]*)" saved as "([^"]*)"$/, async function(
  elementName,
  screenshotName
) {
  expect(await browser.imageComparison.checkElement(this.currentPage.getElement(elementName), screenshotName)).toEqual(
    0
  );
});

Then(/^I compare the screenshot of visible the part of the page saved as "([^"]*)"$/, async screenshotName => {
  expect(await browser.imageComparison.checkScreen(screenshotName)).toEqual(0);
});

Then(/^I compare the full screenshot of the page  saved as "([^"]*)"$/, async screenshotName => {
  expect(await browser.imageComparison.checkFullPageScreen(screenshotName)).toEqual(0);
});
