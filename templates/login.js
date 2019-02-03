const { Given } = require('kakunin');

Given(/^I am logged in as a "([^"]*)$/, async function(user) {
  this.currentUser = {
    account: this.userProvider.getUser(user),
    type: user,
  };

  const mainPage = browser.page.main;
  const loginPage = browser.page.login;

  await mainPage.visit();
  await mainPage.waitForVisibilityOf('login');
  await mainPage.click('login');
  await loginPage.login(this.currentUser.account.email, this.currentUser.account.password);
  await mainPage.waitForInvisibilityOf('login');

  this.currentPage = mainPage;
});
