import { Then, Given, When } from 'cucumber';
import { transformers } from '../../common/transformers';

Given(/^I visit the "([^"]*)" page$/, function(pageName) {
  expect(browser.page[pageName]).toBeDefined();

  this.currentPage = browser.page[pageName];

  return this.currentPage.visit();
});

Given(/^I visit the "([^"]*)" page with parameters:$/, function(pageName, data) {
  expect(browser.page[pageName]).toBeDefined();

  this.currentPage = browser.page[pageName];

  return this.currentPage.visitWithParameters(data);
});

Then(/^the "([^"]*)" page is displayed$/, function(pageName) {
  const self = this;

  return browser.page[pageName].isOn().then(checkResult => {
    if (typeof checkResult !== 'object') {
      return Promise.reject('Check result must be an object!!!');
    }

    self.currentPage = browser.page[pageName];
    self.urlParameters = checkResult.parameters;
  });
});

When(/^I switch to "([^"]*)" iframe$/, function(elementName) {
  return this.currentPage.switchIframe(elementName);
});

Given(/^I visit the "([^"]*)" page with "([^"]*)" basic auth credentials$/, function(pageName, credentialsValue) {
  expect(browser.page[pageName]).toBeDefined();
  this.currentPage = browser.page[pageName];

  return this.currentPage.visitWithBasicAuthCredentials(transformers.transform(credentialsValue));
});
