const { When, Then, methods } = require('kakunin');

When(/^I click the CLICK ME button in simple button disappear page$/, function () {
  const elem = element(by.xpath('//button[@id="button"]'));
  return methods.interactions.click(this.currentPage, elem);
});

Then(/^there are "([^"]*)" table elements$/, function (numberExpression) {
  const elem = $$('table tr');
  return methods.checkers.checkNumberOfElements(this.currentPage, numberExpression, elem);
});

Then(/^the CLICK ME button is not visible$/, function () {
  const elem = element(by.xpath('//button[@id="button"]'));
  return this.currentPage
    .isVisible(elem)
    .then((isVisible) => Promise.reject(isVisible))
    .catch((isVisible) => {
      if (isVisible === true) {
        return Promise.reject(`Element '${elem}' should not be visible.`);
      }

      return Promise.resolve();
    });
});
