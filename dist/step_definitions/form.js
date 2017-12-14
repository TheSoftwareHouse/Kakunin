'use strict';

var _cucumber = require('cucumber');

var _dictionaries = require('../dictionaries');

(0, _cucumber.defineSupportCode)(function ({ When, Then }) {
  When(/^I fill the "([^"]*)" form with:$/, function (formName, data) {
    const self = this;

    return this.currentPage.waitForVisibilityOf(formName).then(function () {
      return expect(self.currentPage.isVisible(formName)).to.eventually.be.fulfilled.then(function () {
        return self.currentPage.fillForm(data.raw());
      });
    });
  });

  Then(/^the "([^"]*)" form is filled with:$/, function (formName, data) {
    const self = this;

    return this.currentPage.waitForVisibilityOf(formName).then(function () {
      return expect(self.currentPage.isVisible(formName)).to.eventually.be.fulfilled.then(function () {
        return self.currentPage.checkForm(data.raw());
      });
    });
  });

  When(/^I fill the "([^"]*)" form field "([^"]*)" with value from the element "([^"]*)"$/, function (form, field, valueElementSelector) {
    const self = this;

    return expect(this.currentPage.isVisible(form)).to.eventually.be.fulfilled.then(function () {
      return self.currentPage[valueElementSelector].getText();
    }).then(function (text) {
      return self.currentPage.fillField(field, text);
    });
  });

  When(/^I fill the "([^"]*)" form field "([^"]*)" with value from the element "([^"]*)" translated by dictionary "([^"]*)"$/, function (form, field, valueElementSelector, dictionaryName) {
    const self = this;

    return expect(this.currentPage.isVisible(form)).to.eventually.be.fulfilled.then(function () {
      return self.currentPage[valueElementSelector].getText();
    }).then(function (text) {
      return _dictionaries.dictionaries.getMappedValue(dictionaryName, text);
    }).then(function (mappedValue) {
      return self.currentPage.fillField(field, mappedValue);
    });
  });

  Then(/^the error messages should be displayed:$/, function (data) {
    const self = this;
    const table = data.rows();

    const promise = [];

    table.forEach(function (item) {
      promise.push(expect(self.currentPage.isVisible(item[0])).to.eventually.be.fulfilled.then(function () {
        return self.currentPage[item[0]].getText().then(function (text) {
          if (text.indexOf(_dictionaries.dictionaries.findMappedValueByPhrase(item[1])) >= 0) {
            return Promise.resolve();
          }

          return Promise.reject(`Error "${_dictionaries.dictionaries.findMappedValueByPhrase(item[1])}" for element "${item[0]}" was not found.`);
        });
      }));
    });

    return Promise.all(promise);
  });
});