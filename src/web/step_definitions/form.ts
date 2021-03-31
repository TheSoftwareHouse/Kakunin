import { dictionaries } from '../../common/dictionaries';
import { When, Then } from 'cucumber';

When(/^I fill the "([^"]*)" form with:$/, function (formName, data) {
  const self = this;

  return this.currentPage.waitForVisibilityOf(formName).then(() => self.currentPage.fillForm(data.raw()));
});

Then(/^the "([^"]*)" form is filled with:$/, function (formName, data) {
  const self = this;

  return this.currentPage.waitForVisibilityOf(formName).then(() => self.currentPage.checkForm(data.raw()));
});

Then(/^the error messages should be displayed:$/, function (data) {
  const self = this;
  const table = data.rows();

  const promise = [];

  table.forEach((item) => {
    promise.push(
      self.currentPage
        .waitForVisibilityOf(item[0])
        .then(() => self.currentPage[item[0]].getText())
        .then((text) => {
          if (text.indexOf(dictionaries.findMappedValueByPhrase(item[1])) >= 0) {
            return Promise.resolve();
          }

          return Promise.reject(
            `Error "${dictionaries.findMappedValueByPhrase(item[1])}" for element "${item[0]}" was not found.`
          );
        })
    );
  });

  return Promise.all(promise);
});
