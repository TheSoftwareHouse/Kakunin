import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({ Then, Given }) {
  Given(/^I visit the "([^"]*)" page$/, function (pageName) {
    expect(browser.page[pageName]).to.not.be.undefined;

    this.currentPage = browser.page[pageName];

    return this.currentPage.visit();
  });

  Given(/^I visit the "([^"]*)" page with parameters:$/, function (pageName, data) {
    expect(browser.page[pageName]).to.not.be.undefined;

    this.currentPage = browser.page[pageName];

    return this.currentPage.visitWithParameters(data);
  });

  Then(/^the "([^"]*)" page is displayed$/, function (pageName) {
    const self = this;

    return browser.page[pageName].isOn()
      .then((checkResult) => {
        if (typeof checkResult !== 'object') {
          return Promise.reject('Check result must be an object!!!');
        }

        self.currentPage = browser.page[pageName];
        self.urlParameters = checkResult.parameters;
      });
  });
});
