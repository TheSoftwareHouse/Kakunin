import * as chai from 'chai';
import { When, Then } from 'cucumber';
import { comparators } from '../comparators';
import { matchers } from '../matchers';
import variableStore from '../core/variable-store.helper';
import { createValueToTextTransformer } from '../transformers/transformer/values-to-text.transformer';
import { methods } from '../web/methods';

const valueToTextTransformer = createValueToTextTransformer();

function checkNumberOfElements(numberExpression, element) {
  const self = this;
  const numberPattern = /\d+/g;
  const numbers = numberExpression.match(numberPattern).map(item => parseInt(item));

  const expectFunction = async (words, num) => {
    const numberOfElements = await self.currentPage.getNumberOfElements(element);
    return chai.expect(numberOfElements).to.be[words.pop()](...num);
  };

  return expectFunction(numberExpression.substr(0, numberExpression.indexOf(numbers[0]) - 1).split(' '), numbers);
}

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
  const self = this;
  const allElements = this.currentPage.getElements(table);
  const hashes = data.hashes();
  return this.currentPage.waitForVisibilityOf(table).then(() => {
    return checkNumberOfElements.call(this, `equal ${hashes.length}`, table).then(() => {
      const promises = [];

      return allElements
        .each((element, index) => {
          const hash = hashes[index];

          for (const prop in hash) {
            if (hash.hasOwnProperty(prop)) {
              const propValue = hash[prop];

              promises.push(
                matchers.match(
                  element.element(self.currentPage.getElement(prop).locator()),
                  valueToTextTransformer.transform(propValue)
                )
              );
            }
          }
        })
        .then(() => Promise.all(promises));
    });
  });
});

Then(/^there are "([^"]*)" following elements for element "([^"]*)":$/, function(numberExpression, elementName, data) {
  const self = this;
  const allElements = this.currentPage.getElements(elementName);
  const hashedData = data.raw();

  if (hashedData.length === 0) {
    return Promise.reject('Missing table under the step.');
  }

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    return checkNumberOfElements.call(this, numberExpression, elementName).then(() => {
      const promises = [];

      return allElements
        .each(element => {
          hashedData.forEach(hash => {
            promises.push(
              matchers.match(
                element.element(self.currentPage.getElement(hash[0]).locator()),
                valueToTextTransformer.transform(hash[1])
              )
            );
          });
        })
        .then(() => Promise.all(promises));
    });
  });
});

Then(/^there are elements for element "([^"]*)":$/, function(elementName, data) {
  const self = this;
  const hashedData = data.raw();

  if (hashedData.length === 0) {
    return Promise.reject('Missing table under the step.');
  }

  const checkers = hashedData.flatMap(elements => {
    return elements
      .filter(Boolean)
      .filter(item => item !== elements[0])
      .map(item => {
        return {
          element: elements[0],
          matcher: item,
        };
      });
  });

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    const promises = checkers.map(check =>
      matchers.match(self.currentPage.getElement(check.element), valueToTextTransformer.transform(check.matcher))
    );

    return Promise.all(promises);
  });
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

Then(/^there is element "([^"]*)" with value "([^"]*)"$/, function(elementName, value) {
  const pageElement = this.currentPage.getElement(elementName);

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    return matchers
      .match(pageElement, valueToTextTransformer.transform(value))
      .then(matcherResult => expect(matcherResult).toBe(true));
  });
});

Then(/^there is no element "([^"]*)" with value "([^"]*)"$/, function(elementName, value) {
  const pageElement = this.currentPage.getElement(elementName);

  return matchers
    .match(pageElement, valueToTextTransformer.transform(value))
    .catch(() => Promise.resolve(false))
    .then(result => (result ? Promise.reject() : Promise.resolve()));
});

Then(/^there is element "([^"]*)" containing "([^"]*)" text$/, function(elementName, value) {
  const pageElement = this.currentPage.getElement(elementName);

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    return matchers.match(pageElement, variableStore.replaceTextVariables(`t:${value}`));
  });
});

Then(/^there is no element "([^"]*)" containing "([^"]*)" text$/, function(elementName, value) {
  const pageElement = this.currentPage.getElement(elementName);

  return matchers
    .match(pageElement, variableStore.replaceTextVariables(`t:${value}`))
    .catch(() => Promise.resolve(false))
    .then(result => (result ? Promise.reject() : Promise.resolve()));
});

Then(/^there is element "([^"]*)" matching "([^"]*)" matcher$/, function(elementName, matcher) {
  const pageElement = this.currentPage.getElement(elementName);

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    return matchers
      .match(pageElement, variableStore.replaceTextVariables(`f:${matcher}`))
      .then(matcherResult => expect(matcherResult).toBe(true));
  });
});

Then(/^there is no element "([^"]*)" matching "([^"]*)" matcher$/, function(elementName, matcher) {
  const pageElement = this.currentPage.getElement(elementName);

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    return matchers
      .match(pageElement, variableStore.replaceTextVariables(`f:${matcher}`))
      .catch(() => Promise.resolve(false))
      .then(result => (result ? Promise.reject() : Promise.resolve()));
  });
});

Then(/^there is element "([^"]*)" with "([^"]*)" regex$/, function(elementName, matcher) {
  const pageElement = this.currentPage.getElement(elementName);

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    return matchers
      .match(pageElement, variableStore.replaceTextVariables(`r:${matcher}`))
      .then(matcherResult => expect(matcherResult).toBe(true));
  });
});

Then(/^there is no element "([^"]*)" with "([^"]*)" regex$/, function(elementName, matcher) {
  const pageElement = this.currentPage.getElement(elementName);

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    return matchers
      .match(pageElement, variableStore.replaceTextVariables(`r:${matcher}`))
      .catch(() => Promise.resolve(false))
      .then(result => (result ? Promise.reject() : Promise.resolve()));
  });
});

Then(/^there are "([^"]*)" "([^"]*)" elements$/, checkNumberOfElements);

Then(/^every "([^"]*)" element should have the same value for element "([^"]*)"$/, function(
  containerName,
  elementName
) {
  const self = this;
  return this.currentPage.waitForVisibilityOf(containerName).then(() => {
    return this.currentPage
      .getElements(containerName)
      .first()
      .element(self.currentPage.getElement(elementName).locator())
      .getText()
      .then(firstElementText => {
        return self.currentPage.getElements(containerName).each(containerElement => {
          containerElement
            .element(self.currentPage.getElement(elementName).locator())
            .getText()
            .then(elementText => {
              expect(elementText).toEqual(firstElementText);
            });
        });
      });
  });
});

Then(/^the element "([^"]*)" should have an item with values:$/, function(elementName, data) {
  const self = this;
  const allElements = this.currentPage.getElements(elementName);
  const hashedData = data.raw();

  if (hashedData.length === 0) {
    return Promise.reject('Missing table under the step.');
  }

  const promises = [];
  return this.currentPage
    .waitForVisibilityOf(elementName)
    .then(() =>
      allElements.each(element => {
        hashedData.forEach(hash => {
          promises.push(
            matchers
              .match(
                element.element(self.currentPage.getElement(hash[0]).locator()),
                valueToTextTransformer.transform(hash[1])
              )
              .catch(() => false)
          );
        });
      })
    )
    .then(() =>
      Promise.all(promises).then(
        methods.shared.handlePromises(
          hashedData,
          () => Promise.resolve(),
          () => Promise.reject('No matching element has been found.')
        )
      )
    );
});

Then(/^the element "([^"]*)" should not have an item with values:$/, function(elementName, data) {
  const self = this;
  const allElements = this.currentPage.getElements(elementName);
  const hashedData = data.raw();

  if (hashedData.length === 0) {
    return Promise.reject('Missing table under the step.');
  }

  const promises = [];

  return allElements
    .each(element => {
      hashedData.forEach(hash => {
        promises.push(
          matchers
            .match(
              element.element(self.currentPage.getElement(hash[0]).locator()),
              valueToTextTransformer.transform(hash[1])
            )
            .catch(() => false)
        );
      });
    })
    .then(() =>
      Promise.all(promises).then(
        methods.shared.handlePromises(
          hashedData,
          () => Promise.reject('Matching element has been found'),
          () => Promise.resolve()
        )
      )
    );
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
  return methods.interactions.scrollToLoader(this.currentPage, elementName);
});

When(/^I press the "([^"]*)" key$/, key => {
  return methods.interactions.pressKey(key);
});

When(/^I drag "([^"]*)" element and drop over "([^"]*)" element$/, function(elementDrag, elementDrop) {
  return methods.interactions.dragAndDrop(this.currentPage, elementDrag, elementDrop);
});
