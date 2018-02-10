import { defineSupportCode } from 'cucumber';
import { dictionaries } from '../dictionaries';

defineSupportCode(function ({ When, Then }) {
  When(/^I fill the "([^"]*)" form with:$/, function (formName, data) {
    const self = this;

    return this.currentPage.waitForVisibilityOf(formName).then(function() {
      return expect(self.currentPage.isVisible(formName))
      .to.eventually.be.fulfilled.then(function() {
          return self.currentPage.fillForm(data.raw());
        });
    });
  });

  Then(/^the "([^"]*)" form is filled with:$/, function (formName, data) {
    const self = this;

    return this.currentPage.waitForVisibilityOf(formName).then(function() {
      return expect(self.currentPage.isVisible(formName))
      .to.eventually.be.fulfilled.then(function() {
        return self.currentPage.checkForm(data.raw());
      });
    });
  });

  Then(/^the error messages should be displayed:$/, function (data) {
    const self = this;
    const table = data.rows();

    const promise = [];

    table.forEach(function (item) {
      promise.push(
        expect(self.currentPage.isVisible(item[0]))
          .to.eventually.be.fulfilled.then(function () {
            return self.currentPage[item[0]].getText().then(function (text) {
              if (text.indexOf(dictionaries.findMappedValueByPhrase(item[1])) >= 0) {
                return Promise.resolve();
              }

              return Promise.reject(`Error "${dictionaries.findMappedValueByPhrase(item[1])}" for element "${item[0]}" was not found.`);
            });
          })
      );
    });

    return Promise.all(promise);
  });
});
