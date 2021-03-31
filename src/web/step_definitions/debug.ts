import { Then } from 'cucumber';

Then(/^I wait for "([^"]*)" seconds$/, (seconds) => {
  return browser.sleep(Number(seconds) * 1000);
});
