import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({ Then }) {
  Then(/^I wait for "([^"]*)" seconds$/, function (number) {
    return browser.sleep(Number(number) * 1000);
  });

  Then(/^I pause$/, function () {
    browser.pause();
  });
});
