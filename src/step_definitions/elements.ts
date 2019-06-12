import * as chai from 'chai';
import { When, Then } from 'cucumber';
import { comparators } from '../comparators';
import config from '../core/config.helper';
import { matchers, regexBuilder } from '../matchers';
import { waitForCondition } from '../web/cucumber/wait-for-condition.helper';
import variableStore from '../web/variable-store.helper';

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
  if (this.currentPage.getElement(elementName) instanceof protractor.ElementArrayFinder) {
    return waitForCondition(condition, timeout)(this.currentPage.getElement(elementName).first());
  }

  return waitForCondition(condition, timeout)(this.currentPage.getElement(elementName));
});

When(/^I scroll to the "([^"]*)" element$/, function(elementName) {
  return this.currentPage.scrollIntoElement(elementName);
});

When(/^I click the "([^"]*)" element$/, function(elementName) {
  return this.currentPage
    .scrollIntoElement(elementName)
    .catch(() => Promise.resolve())
    .then(() => this.currentPage.waitForVisibilityOf(elementName))
    .then(() => this.currentPage.scrollIntoElement(elementName))
    .then(() => this.currentPage.click(elementName))
    .catch(() => {
      return waitForCondition('elementToBeClickable', timeout)(this.currentPage.getElement(elementName)).then(() => {
        return this.currentPage.click(elementName);
      });
    })
    .catch(() => {
      console.warn('Warning! Element was not clickable. We need to scroll it down.');
      return browser
        .executeScript('window.scrollBy(0,50);')
        .then(() => this.currentPage.waitForVisibilityOf(elementName))
        .then(() => this.currentPage.click(elementName));
    })
    .catch(() => {
      console.warn('Warning! Element was not clickable. We need use the WebDriver method to perform the click action.');
      return browser
        .actions()
        .mouseMove(this.currentPage.getElement(elementName))
        .mouseMove({ x: 5, y: 0 })
        .click()
        .perform();
    })
    .catch(() => {
      return Promise.reject(`Error, after scrolling the element "${elementName}" is still not clickable.`);
    });
});

When(/^I store the "([^"]*)" element text as "([^"]*)" variable$/, function(elementName, variable) {
  return this.currentPage.waitForVisibilityOf(elementName).then(async () => {
    const elementTag = await this.currentPage[elementName].getTagName(tag => tag);

    if (elementTag === 'input' || elementTag === 'textarea') {
      return this.currentPage
        .getElement(elementName)
        .getAttribute('value')
        .then(value => {
          variableStore.storeVariable(variable, value);
        });
    }

    return this.currentPage
      .getElement(elementName)
      .getText()
      .then(text => {
        variableStore.storeVariable(variable, text);
      });
  });
});

When(/^I update the "([^"]*)" element text as "([^"]*)" variable$/, function(elementName, variable) {
  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    this.currentPage
      .getElement(elementName)
      .getText()
      .then(text => {
        variableStore.updateVariable(variable, text);
      });
  });
});

When(/^I store the "([^"]*)" element text matched by "([^"]*)" as "([^"]*)" variable$/, function(
  elementName,
  matcher,
  variable
) {
  const regex = regexBuilder.buildRegex(matcher);

  return this.currentPage.waitForVisibilityOf(elementName).then(() => {
    return this.currentPage
      .getElement(elementName)
      .getText()
      .then(text => {
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

When(/^I wait for the "([^"]*)" element to disappear$/, function(elementName, sync) {
  const self = this;
  let maxRepeats = 10;

  const interval = setInterval(() => {
    console.log('Waiting for element to disappear...');

    return self.currentPage.isPresent(elementName).then(isPresent => {
      if (!isPresent) {
        clearInterval(interval);
        sync();
        return;
      }

      maxRepeats--;

      if (maxRepeats === 0) {
        clearInterval(interval);
        sync('Element is still visible');
      }
    });
  }, 1500);
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
  const self = this;
  const columns = data.raw().map(element => element[0]);
  const promises = [];
  return this.currentPage.waitForVisibilityOf(table).then(() => {
    return this.currentPage
      .getElement(table)
      .each(element => {
        const rowPromises = [];

        for (const columnIndex in columns) {
          if (columns.hasOwnProperty(columnIndex)) {
            rowPromises.push(element.element(self.currentPage.getElement(columns[columnIndex]).locator()).getText());
          }
        }

        promises.push(Promise.all(rowPromises));
      })
      .then(() =>
        Promise.all(promises).then(resolvedPromises => {
          variableStore.storeVariable(variableName, resolvedPromises);
        })
      );
  });
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
                  variableStore.replaceTextVariables(propValue)
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
                variableStore.replaceTextVariables(hash[1])
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
      matchers.match(self.currentPage.getElement(check.element), variableStore.replaceTextVariables(check.matcher))
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
      .match(pageElement, variableStore.replaceTextVariables(value))
      .then(matcherResult => expect(matcherResult).toBe(true));
  });
});

Then(/^there is no element "([^"]*)" with value "([^"]*)"$/, function(elementName, value) {
  const pageElement = this.currentPage.getElement(elementName);

  return matchers
    .match(pageElement, variableStore.replaceTextVariables(value))
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
                variableStore.replaceTextVariables(hash[1])
              )
              .catch(() => false)
          );
        });
      })
    )
    .then(() =>
      Promise.all(promises).then(
        handlePromises(hashedData, () => Promise.resolve(), () => Promise.reject('No matching element has been found.'))
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
              variableStore.replaceTextVariables(hash[1])
            )
            .catch(() => false)
        );
      });
    })
    .then(() =>
      Promise.all(promises).then(
        handlePromises(hashedData, () => Promise.reject('Matching element has been found'), () => Promise.resolve())
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
  const self = this;

  const scrollToLoader = () => {
    return self.currentPage
      .isPresent(elementName)
      .then(isPresent => {
        if (isPresent) {
          return self.currentPage.scrollIntoElement(elementName);
        }

        return Promise.resolve();
      })
      .then(() => self.currentPage.isPresent(elementName))
      .then(isPresent => {
        if (isPresent) {
          return browser.sleep(1000).then(() => scrollToLoader());
        }

        return Promise.resolve();
      });
  };

  return scrollToLoader();
});

When(/^I press the "([^"]*)" key$/, key => {
  const keyTransformed = key.toUpperCase();

  return Promise.resolve(
    browser
      .actions()
      .sendKeys(protractor.Key[keyTransformed])
      .perform()
  );
});

When(/^I drag "([^"]*)" element and drop over "([^"]*)" element$/, async function(elementDrag, elementDrop) {
  const wait = timeToWait => browser.sleep(timeToWait);

  await this.currentPage.waitForVisibilityOf(elementDrag);
  await browser
    .actions()
    .mouseMove(this.currentPage.getElement(elementDrag))
    .perform();
  await wait(200);
  await browser
    .actions()
    .mouseDown()
    .perform();
  await wait(200);
  await browser
    .actions()
    .mouseMove(this.currentPage.getElement(elementDrop))
    .perform();
  await wait(200);
  await browser
    .actions()
    .mouseUp()
    .perform();
});
