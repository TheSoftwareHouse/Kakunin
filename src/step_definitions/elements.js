import { defineSupportCode } from 'cucumber';
import { matchers, regexBuilder } from '../matchers';
import variableStore from '../helpers/variable-store.helper';
import { comparators } from '../comparators';
import config from '../helpers/config.helper';
import chalk from 'chalk';
import { waitForCondition } from '../helpers/wait-for-condition.helper';

const timeout = parseInt(config.elementsVisibilityTimeout) * 1000;

const handlePromises = (hashedData, onSuccess, onReject) => resolvedPromises => {
  for (let i = 0; i < resolvedPromises.length; i += hashedData.length) {
    let allFieldsMatching = true;

    for (let j = i; j < i + hashedData.length; j++) {
      if (resolvedPromises[j] === false) {
        allFieldsMatching = false;
        break;
      }
    }

    if (allFieldsMatching) {
      return onSuccess();
    }
  }

  return onReject();
};

defineSupportCode(function ({ When, Then }) {
  When(/^I wait for "([^"]*)" of the "([^"]*)" element$/, function (condition, elementName) {
    if (this.currentPage[elementName] instanceof protractor.ElementArrayFinder) {
      return waitForCondition(condition, timeout)(this.currentPage[elementName].first());
    }

    return waitForCondition(condition, timeout)(this.currentPage[elementName]);
  });

  When(/^I scroll to the "([^"]*)" element$/, function (elementName) {
    return this.currentPage.scrollIntoElement(elementName);
  });

  When(/^I click the "([^"]*)" element$/, function (elementName) {
    return this.currentPage.scrollIntoElement(elementName)
    .catch(() => Promise.resolve())
    .then(() => this.currentPage.waitForVisibilityOf(elementName))
    .then(() => this.currentPage.scrollIntoElement(elementName))
    .then(() => this.currentPage.click(elementName))
    .catch(() => {
      return waitForCondition('elementToBeClickable', timeout)(this.currentPage[elementName])
        .then(() => this.currentPage.click(elementName));
    })
    .catch(() => {
      console.warn('Warning! Element was not clickable. We need to scroll it down.');
      return browser.executeScript('window.scrollBy(0,50);')
        .then(() => this.currentPage.waitForVisibilityOf(elementName))
        .then(() => this.currentPage.click(elementName));
    })
    .catch(() => {
      console.warn('Warning! Element was not clickable. We need use the WebDriver method to perform the click action.');
      return browser.actions()
        .mouseMove(this.currentPage[elementName])
        .mouseMove({ x: 5, y: 0 })
        .click()
        .perform();
    })
    .catch(() => {
      return Promise.reject(`Error, after scrolling the element "${elementName}" is still not clickable.`);
    });
  });

  When(/^I store the "([^"]*)" element text as "([^"]*)" variable$/, function (elementName, variable) {
    return this.currentPage.waitForVisibilityOf(elementName)
      .then(() => {
        return this.currentPage[elementName].getText()
          .then((text) => { variableStore.storeVariable(variable, text); });
      });
  });

  When(/^I update the "([^"]*)" element text as "([^"]*)" variable$/, function (elementName, variable) {
    return this.currentPage.waitForVisibilityOf(elementName).then(() => {
      this.currentPage[elementName].getText()
        .then((text) => { variableStore.updateVariable(variable, text); });
    });
  });

  When(/^I store the "([^"]*)" element text matched by "([^"]*)" as "([^"]*)" variable$/, function (elementName, matcher, variable) {
    const regex = regexBuilder.buildRegex(matcher);

    return this.currentPage.waitForVisibilityOf(elementName).then(() => {
      return this.currentPage[elementName].getText().then((text) => {
        const matchedText = text.match(regex);

        if (matchedText === null) {
          return Promise.reject(`Could not match text ${text} with matcher ${matcher}`);
        }

        if (matchedText.length <= 1) {
          return Promise.reject(`Matcher ${matcher} does not contain capturing brackets`);
        }

        variableStore.storeVariable(variable, matchedText[1]);
      });
    });
  });

  When(/^I wait for the "([^"]*)" element to disappear$/, function (element, sync) {
    const self = this;
    let maxRepeats = 10;

    const interval = setInterval(() => {
      console.log('Waiting for element to disappear...');

      return self.currentPage.isPresent(element).then(isPresent => {

        if (!isPresent) {
          clearInterval(interval);
          sync();
          return;
        }

        maxRepeats--;

        if (maxRepeats === 0) {
          clearInterval(interval);
          sync('Element is still visible');
          return;
        }

      });
    }, 1500);
  });

  Then(/^the "([^"]*)" element is present$/, function (elementName) {
    chalk.red('DEPRECATED: the "([^"]*)" element is present , use I wait for "([^"]*)" of the "([^"]*)" element instead.');
    return expect(this.currentPage.isPresent(elementName)).to.eventually.be.true;
  });

  Then(/^the "([^"]*)" element is not present$/, function (elementName) {
    chalk.red('DEPRECATED: the "([^"]*)" element is not present , use I wait for the "([^"]*)" element to disappear instead.');
    return expect(this.currentPage.isPresent(elementName)).to.eventually.be.false;
  });

  Then(/^the "([^"]*)" element is visible$/, function (elementName) {
    return this.currentPage.isVisible(elementName);
  });

  Then(/^the "([^"]*)" element is not visible$/, function (elementName) {
    return this.currentPage.isVisible(elementName)
      .then((isVisible) => Promise.reject(isVisible))
      .catch(isVisible => {
        if (isVisible === true) {
          return Promise.reject(`Element '${elementName}' should not be visible.`);
        }

        return Promise.resolve();
      });
  });

  Then(/^the "([^"]*)" element is disabled$/, function (elementName) {
    return expect(this.currentPage.isDisabled(elementName)).to.eventually.be.true;
  });

  When(/^I store table "([^"]*)" rows as "([^"]*)" with columns:$/, function (table, variableName, data) {
    const self = this;
    const columns = data.raw().map((element) => element[0]);
    const promises = [];
    return this.currentPage.waitForVisibilityOf(table).then(() => {

      return this.currentPage[table].each(function(element) {
        const rowPromises = [];

        for (const columnIndex in columns) {
          if (columns.hasOwnProperty(columnIndex)) {
            rowPromises.push(
              element.element(self.currentPage[columns[columnIndex]].locator()).
                getText());
          }
        }

        promises.push(Promise.all(rowPromises));
      }).then(function() {
        return Promise.all(promises).then(function(resolvedPromises) {
          variableStore.storeVariable(variableName, resolvedPromises);
        });
      });
    });
  });

  Then(/^there are following elements in table "([^"]*)":$/, function (table, data) {
    const self = this;
    const allElements = this.currentPage[table];
    const hashes = data.hashes();
    return this.currentPage.waitForVisibilityOf(table).then(() => {
      return checkNumberOfElements.call(this, `equal ${hashes.length}`, table)
        .then(function() {
          const promises = [];

          return allElements.each(function(element, index) {
            const hash = hashes[index];

            for (const prop in hash) {
              if (hash.hasOwnProperty(prop)) {
                const propValue = hash[prop];

                promises.push(matchers.match(element.element(self.currentPage[prop].locator()), variableStore.replaceTextVariables(propValue)));
              }
            }
          }).then(function() {
            return Promise.all(promises);
          });
        });
    });
  });

  Then(/^there are "([^"]*)" following elements for element "([^"]*)":$/, function (numberExpression, elementName, data) {
    const self = this;
    const allElements = this.currentPage[elementName];
    const hashedData = data.raw();

    if (hashedData.length === 0) {
      return Promise.reject('Missing table under the step.');
    }

    return this.currentPage.waitForVisibilityOf(elementName).then(() => {

      return checkNumberOfElements.call(this, numberExpression, elementName).then(function () {
        const promises = [];

        return allElements.each(function (element) {
          hashedData.forEach(function (hash) {
            promises.push(
              matchers.match(
                element.element(self.currentPage[hash[0]].locator()),
                variableStore.replaceTextVariables(hash[1])
              )
            );
          });
        }).then(function () {
          return Promise.all(promises);
        });
      });
    });
  });

  Then(/^there is element "([^"]*)" with value "([^"]*)"$/, function (elementName, value) {
    const pageElement = this.currentPage[elementName];

    return this.currentPage.waitForVisibilityOf(elementName).then(() => {

      return matchers.match(pageElement, variableStore.replaceTextVariables(value)).then(function (matcherResult) {
        return expect(matcherResult).to.be.true;
      });
    });
  });

  Then(/^there is no element "([^"]*)" with value "([^"]*)"$/, function (elementName, value) {
    const pageElement = this.currentPage[elementName];

    return matchers.match(pageElement, variableStore.replaceTextVariables(value)).then(function (matcherResult) {
      return expect(matcherResult).to.not.be.true;
    })
      .catch(() => Promise.resolve());
  });

  function checkNumberOfElements(numberExpression, element) {
    const self = this;
    const numberPattern = /\d+/g;
    const numbers = numberExpression.match(numberPattern).map((item) => parseInt(item));

    const expectFunction = function (words, numbers) {
      return expect(self.currentPage.getNumberOfElements(element)).to.eventually.be[words.pop()](...numbers);
    };

    return expectFunction(
      numberExpression.substr(0, numberExpression.indexOf(numbers[0]) - 1).split(' '),
      numbers
    );
  }

  Then(/^there are "([^"]*)" "([^"]*)" elements$/, checkNumberOfElements);

  Then(/^every "([^"]*)" element should have the same value for element "([^"]*)"$/, function (containerName, elementName) {
    const self = this;
    return this.currentPage.waitForVisibilityOf(containerName).then(() => {
      return this.currentPage[containerName].first().
        element(self.currentPage[elementName].locator()).
        getText().then(
          function(firstElementText) {
            return self.currentPage[containerName].each(
              function(containerElement) {
                containerElement.element(self.currentPage[elementName].locator()).getText().then(
                  function(elementText) {
                    expect(elementText).to.be.equal(firstElementText);
                  }
                );
              });
          }
        );
    });
  });

  Then(/^the element "([^"]*)" should have an item with values:$/, function (elementName, data) {
    const self = this;
    const allElements = this.currentPage[elementName];
    const hashedData = data.raw();

    if (hashedData.length === 0) {
      return Promise.reject('Missing table under the step.');
    }

    const promises = [];
    return this.currentPage.waitForVisibilityOf(elementName).then(() => {

      return allElements.each(function (element) {
        hashedData.forEach(function (hash) {
          promises.push(matchers.match(
              element.element(self.currentPage[hash[0]].locator()),
              variableStore.replaceTextVariables(hash[1])
            )
              .catch(() => false)
          );
        });
      });
    }).then(function () {
      return Promise.all(promises).then(
        handlePromises(hashedData, () => Promise.resolve(), () => Promise.reject('No matching element has been found.'))
      )
    });
  });

  Then(/^the element "([^"]*)" should not have an item with values:$/, function (elementName, data) {
    const self = this;
    const allElements = this.currentPage[elementName];
    const hashedData = data.raw();

    if (hashedData.length === 0) {
      return Promise.reject('Missing table under the step.');
    }

    const promises = [];

    return allElements.each(function (element) {
      hashedData.forEach(function (hash) {
        promises.push(matchers.match(
            element.element(self.currentPage[hash[0]].locator()),
            variableStore.replaceTextVariables(hash[1])
          )
            .catch(() => false)
        );
      });
    }).then(function () {
      return Promise.all(promises).then(
        handlePromises(hashedData, () => Promise.reject('Matching element has been found'), () => Promise.resolve())
      )
    });
  });

  Then(/^"([^"]*)" value on the "([^"]*)" list is sorted in "([^"]*)" order$/, function (elementValue, elementList, dependency) {
    const self = this;
    const promise = [];

    return this.currentPage.waitForVisibilityOf(elementList).then(() => {
      return self.currentPage[elementList].each(function(singleElement) {
        promise.push(singleElement.element(self.currentPage[elementValue].locator()).getText());
      }).then(function() {
        return Promise.all(promise);
      }).then(function(elementsValues) {
        return comparators.compare(elementsValues, dependency);
      });
    })
  });

  When(/^I infinitely scroll to the "([^"]*)" element$/, function (elementName) {
    const self = this;

    const scrollToLoader = () => self.currentPage.isPresent(elementName)
      .then((isPresent) => {
        if (isPresent) {
          return self.currentPage.scrollIntoElement(elementName);
        }

        return Promise.resolve();
      })
      .then(() => self.currentPage.isPresent(elementName))
      .then((isPresent) => {
        if (isPresent) {
          return browser.sleep(1000).then(() => scrollToLoader());
        }

        return Promise.resolve();
      });

    return scrollToLoader();
  });

  When(/^I press the "([^"]*)" key$/, function (key) {
    const keyTransformed = key.toUpperCase();

    return Promise.resolve(browser.actions().sendKeys(protractor.Key[keyTransformed]).perform());
  });

  When(/^I drag "([^"]*)" element and drop over "([^"]*)" element$/, async function (elementDrag, elementDrop) {
    const wait = (timeToWait) => browser.sleep(timeToWait);

    await this.currentPage.waitForVisibilityOf(elementDrag);
    await browser.actions().mouseMove(this.currentPage[elementDrag]).perform();
    await wait(200);
    await browser.actions().mouseDown().perform();
    await wait(200);
    await browser.actions().mouseMove(this.currentPage[elementDrop]).perform();
    await wait(200);
    await browser.actions().mouseUp().perform();
  });
});
