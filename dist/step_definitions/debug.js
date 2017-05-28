'use strict';

var _cucumber = require('cucumber');

(0, _cucumber.defineSupportCode)(function ({ Then }) {
  Then('I wait for "{number}" seconds', function (number) {
    return browser.sleep(Number(number) * 1000);
  });

  Then('I pause', function () {
    browser.pause();
  });
});