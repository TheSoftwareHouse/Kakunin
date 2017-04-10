const dictionaries = require('../dictionaries').dictionaries;

module.exports = function() {
  this.When('I fill the "$formName" form with:', function (formName, data) {
    const self = this;

    return expect(this.currentPage.isVisible(formName)).to.eventually.be.fulfilled.then(function() {
      return self.currentPage.fillForm(data.rowsHash());
    });
  });

  this.Then('the "$formName" form is filled with:', function (formName, data) {
    const formData = data.rowsHash();
    const self = this;

    return expect(this.currentPage.isVisible(formName)).to.eventually.be.fulfilled.then(function() {
      return self.currentPage.checkForm(formData);
    });
  });

  this.When('I fill the "$form" form field "$field" with value from the element "$valueElementSelector"', function(form, field, valueElementSelector) {
    const self = this;

    return expect(this.currentPage.isVisible(form)).to.eventually.be.fulfilled.then(function() {
      return self.currentPage[valueElementSelector].getText();
    }).then(function(text) {
      return self.currentPage.fillField(field, text);
    });
  });

  this.When('I fill the "$form" form field "$field" with value from the element "$valueElementSelector" translated by dictionary "$dictionaryName"', function(form, field, valueElementSelector, dictionaryName) {
    const self = this;

    return expect(this.currentPage.isVisible(form)).to.eventually.be.fulfilled.then(function() {
      return self.currentPage[valueElementSelector].getText();
    })
      .then(function(text) {
        return dictionaries.getMappedValue(dictionaryName, text);
      })
      .then(function(mappedValue) {
        return self.currentPage.fillField(field, mappedValue);
      });
  });

  this.Then('the error messages should be displayed:', function(data) {
    const self = this;
    const table = data.hashes();

    const promise = [];

    table.forEach(function(item) {
      promise.push(
        expect(self.currentPage.isVisible(item.element)).to.eventually.be.fulfilled.then(function() {
          return self.currentPage[item.element].getText().then(function(text) {
            if (text.indexOf(item.errorMessage) >= 0) {
              return Promise.resolve();
            }

            return Promise.reject(`Error "${item.errorMessage}" for element "${item.element}" was not found.`);
          });
        })
      );
    });

    return Promise.all(promise);
  });
};
