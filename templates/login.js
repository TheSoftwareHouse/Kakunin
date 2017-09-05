const { defineSupportCode } = require('kakunin');

defineSupportCode(({ Given }) => {
  Given(/^I am logged in as a "([^"]*)$/, function (user) {
    this.currentUser = {
      account: this.userProvider.getUser(user),
      type: user
    };

    const mainPage = browser.page.main;
    const loginPage = browser.page.login;
    const self = this;

    return mainPage.visit().then(function () {
      return mainPage.isVisible('login');
    }).then(function () {
      return mainPage.click('login');
    }).then(function () {
      return loginPage.login(self.currentUser.account.email, self.currentUser.account.password);
    }).then(function () {
      return expect(mainPage.isPresent('login')).not.to.eventually.be.ok;
    }).then(function () {
      self.currentPage = mainPage;
      return Promise.resolve();
    });
  });
});
