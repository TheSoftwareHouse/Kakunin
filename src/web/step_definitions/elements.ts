import { When, Then } from 'cucumber';
import { comparators } from '../../common/comparators';
import { methods } from '../methods';


When(/^I wait for "([^"]*)" of the "([^"]*)" element$/, function(condition, elementName) {
  return methods.wait.waitForElementCondition(this.currentPage, condition, elementName);
});

When(/^I scroll to the "([^"]*)" element$/, function(elementName) {
  return this.currentPage.scrollIntoElement(elementName);
});

When(/^I click the "([^"]*)" element$/, function(elementName) {
  return methods.interactions.click(this.currentPage, elementName);
});

When(/^I store the "([^"]*)" element text as "([^"]*)" variable$/, function(elementName, variable) {
  return methods.store.storeTextAsVariable(this.currentPage, elementName, variable);
});

When(/^I update the "([^"]*)" element text as "([^"]*)" variable$/, function(elementName, variable) {
  return methods.store.updateStoredTextAsVariable(this.currentPage, elementName, variable);
});

When(/^I store the "([^"]*)" element text matched by "([^"]*)" as "([^"]*)" variable$/, function(
  elementName,
  matcher,
  variable
) {
  return methods.store.storeTextMatchedByAsVariable(this.currentPage, elementName, matcher, variable);
});

When(/^I wait for the "([^"]*)" element to disappear$/, function(elementName, sync) {
  methods.wait.waitForElementDisappear(this.currentPage, elementName, sync);
});

Then(/^the "([^"]*)" element is visible$/, function(elementName) {
  return this.currentPage.isVisible(elementName);
});

Then(/^the "([^"]*)" element is not visible$/, function(elementName) {
  return this.currentPage
    .isVisible(elementName)
    .then(isVisible => Promise.reject(isVisible))
    .catch(isVisible => {
      if (isVisible === true) {
        return Promise.reject(`Element '${elementName}' should not be visible.`);
      }

      return Promise.resolve();
    });
});

Then(/^the "([^"]*)" element is disabled$/, async function(elementName) {
  return await expect(this.currentPage.isDisabled(elementName)).resolves.toBe(true);
});

When(/^I store table "([^"]*)" rows as "([^"]*)" with columns:$/, function(table, variableName, data) {
  return methods.store.storeTableRowsWithColumnsAsVariable(this.currentPage, table, variableName, data);
});

Then(/^there are following elements in table "([^"]*)":$/, function(table, data) {
  return methods.checkers.checkIfTableContainsElements(this.currentPage, table, data);
});

Then(/^there are "([^"]*)" following elements for element "([^"]*)":$/, function(numberExpression, elementName, data) {
  return methods.checkers.checkIfTableElementContainsMatchingNumberOfElements(
    this.currentPage,
    numberExpression,
    elementName,
    data
  );
});

Then(/^there are elements for element "([^"]*)":$/, function(elementName, data) {
  return methods.checkers.checkIfElementContainsChildElementsMatchingMatchers(this.currentPage, elementName, data);
});

Then(/^there are "([^"]*)" dropdown list elements with following options:$/, function(elementName, data) {
  const allOptionElements = this.currentPage.getElement(elementName);
  const hashedData = data.raw();

  if (hashedData.length === 0) {
    return Promise.reject('Missing table under the step.');
  }

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    allOptionElements.getText().then(textArray => {
      if (textArray.length === hashedData.length) {
        hashedData.forEach(hash => {
          textArray.splice(textArray.indexOf(hash), 1);
        });
      } else {
        return Promise.reject("Number of options doesn't match the number of asked");
      }
      expect(textArray.length).toEqual(0);
    });
  });
});

Then(/^there (is|is no) element "([^"]*)" with value "([^"]*)"$/, function(assert, elementName, value) {
  return methods.checkers.checkIfElementContainsValue(this.currentPage, assert, elementName, value);
});

Then(/^there (is|is no) element "([^"]*)" containing "([^"]*)" text$/, function(assert, elementName, value) {
  return methods.checkers.checkIfElementContainsText(this.currentPage, assert, elementName, value);
});

Then(/^there (is|is no) element "([^"]*)" matching "([^"]*)" matcher$/, function(assert, elementName, matcher) {
  return methods.checkers.checkIfElementMatchesMatcher(this.currentPage, assert, elementName, matcher);
});

Then(/^there (is|is no) element "([^"]*)" with "([^"]*)" regex$/, function(assert, elementName, matcher) {
  return methods.checkers.checkIfElementMatchesRegex(this.currentPage, assert, elementName, matcher);
});

Then(/^there are "([^"]*)" "([^"]*)" elements$/, function(numberExpression, element) {
  return methods.checkers.checkNumberOfElements(this.currentPage, numberExpression, element);
});

Then(/^every "([^"]*)" element should have the same value for element "([^"]*)"$/, function(
  containerName,
  elementName
) {
  return methods.checkers.checkIfAllElementsHaveMatchingValues(this.currentPage, containerName, elementName);
});

Then(/^the element "([^"]*)" should (have|not have) an item with values:$/, function(elementName, assertion, data) {
  return methods.checkers.checkIfElementHaveItemsWithValue(this.currentPage, elementName, assertion, data);
});

Then(/^"([^"]*)" value on the "([^"]*)" list is sorted in "([^"]*)" order$/, function(
  elementValue,
  elementList,
  dependency
) {
  const self = this;
  const promise = [];

  return this.currentPage.waitForVisibilityOf(elementList).then(() => {
    return self.currentPage
      .getElements(elementList)
      .each(singleElement => {
        promise.push(singleElement.element(self.currentPage.getElement(elementValue).locator()).getText());
      })
      .then(() => Promise.all(promise))
      .then(elementsValues => comparators.compare(elementsValues, dependency));
  });
});

When(/^I infinitely scroll to the "([^"]*)" element$/, function(elementName) {
  return methods.interactions.infinityScrollTo(this.currentPage, elementName);
});

When(/^I press the "([^"]*)" key$/, key => {
  return methods.interactions.pressKey(key);
});

When(/^I drag "([^"]*)" element and drop over "([^"]*)" element$/, function(elementDrag, elementDrop) {
  return methods.interactions.dragAndDrop(this.currentPage, elementDrag, elementDrop);
});
