const { defineSupportCode } = require ('kakunin');

defineSupportCode(function ({ Given, Then }) {
  Given(/^there is a todo "([^"]*)"$/, function(todo) {
    return this.currentPage.fillForm([
      [
        'todoInput',
        todo
      ]
    ])
      .then(() => browser.actions().sendKeys(protractor.Key['ENTER']).perform());
  });

  Given(/^there is a completed todo "([^"]*)"$/, function(todo) {
    return this.currentPage.fillForm([
      [
        'todoInput',
        todo
      ]
    ])
      .then(() => browser.actions().sendKeys(protractor.Key['ENTER']).perform())
      .then(() => this.currentPage['todos'].count())
      .then((count) => {
        return this.currentPage['todos'].get(count - 1).$('input.toggle').click();
      });
  });
});
