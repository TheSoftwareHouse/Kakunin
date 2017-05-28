import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({ Then, Given }) {
  Given('I visit the "{pageName}" page', function (pageName) {
    expect(browser.page[pageName]).to.not.be.undefined;

    this.currentPage = browser.page[pageName];

    return this.currentPage.visit();
  });

  Then('the "{pageName}" page is displayed', function (pageName) {
    const self = this;

    return browser.page[pageName].isOn()
      .then((checkResult) => {
        self.currentPage = browser.page[pageName];
        self.urlParameters = checkResult.parameters;
      });
  });
});
