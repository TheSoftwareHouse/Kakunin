module.exports = function() {
  this.Given('I visit the "$pageName" page', function(pageName) {
    expect(browser.page[pageName]).to.not.be.undefined;

    this.currentPage = browser.page[pageName];

    return this.currentPage.visit();
  });

  this.Then('the "$pageName" page is displayed', function(pageName) {
    const self = this;

    return browser.page[pageName].isOn()
      .then(function(checkResult) {
        self.currentPage = browser.page[pageName];
        self.urlParameters = checkResult.parameters;
      });
  });
};
