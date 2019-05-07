import { When } from 'cucumber';

When(/^I switch to window number "([^"]*)" of a browser$/, tabNumber => {
  return browser.getAllWindowHandles().then(handles => browser.switchTo().window(handles[tabNumber - 1]));
});

When(/^I close the current browser tab$/, () => {
  return browser
    .close()
    .then(() => browser.getAllWindowHandles())
    .then(tabs => browser.switchTo().window(tabs[0]));
});
