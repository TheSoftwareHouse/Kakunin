import { defineSupportCode } from 'cucumber';

defineSupportCode(({ Then }) => {
  Then(/^I wait for "([^"]*)" seconds$/, seconds => {
    return browser.sleep(Number(seconds) * 1000);
  });
});
