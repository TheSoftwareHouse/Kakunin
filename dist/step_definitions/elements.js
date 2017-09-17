'use strict';

var _cucumber = require('cucumber');

var _matchers = require('../matchers');

var _variableStore = require('../helpers/variable-store.helper');

var _variableStore2 = _interopRequireDefault(_variableStore);

var _comparators = require('../comparators');

var _config = require('../helpers/config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(0, _cucumber.defineSupportCode)(function ({ When, Then }) {
  When(/^I wait for "([^"]*)" of the "([^"]*)" element$/, function (condition, elementName) {
    const timeout = parseInt(_config2.default.elementsVisibilityTimeout) * 1000;

    if (this.currentPage[elementName] instanceof protractor.ElementArrayFinder) {
      return browser.wait(protractor.ExpectedConditions[condition](this.currentPage[elementName].get(0)), timeout);
    }

    return browser.wait(protractor.ExpectedConditions[condition](this.currentPage[elementName]), timeout);
  });

  When(/^I scroll to the "([^"]*)" element$/, function (elementName) {
    return this.currentPage.scrollIntoElement(elementName);
  });

  When(/^I click the "([^"]*)" element$/, function (elementName) {
    const self = this;

    return self.currentPage.scrollIntoElement(elementName).then(function () {
      return self.currentPage.click(elementName).then(null, function () {
        console.warn('Warning! Element was not clickable. We need to scroll it down.');
        return browser.executeScript('window.scrollBy(0,50);').then(function () {
          return self.currentPage.click(elementName).then(null, function () {
            return Promise.reject(`Error, after scrolling the element "${elementName}" is still not clickable.`);
          });
        });
      });
    });
  });

  When(/^I click the "([^"]*)" "([^"]*)" element$/, function (elementName, parameter) {
    const self = this;

    return self.currentPage.scrollIntoElement(elementName).then(function () {
      return self.currentPage[elementName](parameter).click();
    });
  });

  When(/^I click the "([^"]*)" element if it is visible$/, function (elementName) {
    const self = this;

    return this.currentPage.isVisible(elementName).then(function () {
      return self.currentPage.scrollIntoElement(elementName).then(function () {
        return self.currentPage.click(elementName);
      });
    }).catch(function () {
      return Promise.resolve();
    });
  });

  When(/^I store the "([^"]*)" element text as "([^"]*)" variable$/, function (element, variable) {
    return this.currentPage[element].getText().then(text => {
      _variableStore2.default.storeVariable(variable, text);
    });
  });

  When(/^I update the "([^"]*)" element text as "([^"]*)" variable$/, function (element, variable) {
    return this.currentPage[element].getText().then(text => {
      _variableStore2.default.updateVariable(variable, text);
    });
  });

  When(/^I store the "([^"]*)" element text matched by "([^"]*)" as "([^"]*)" variable$/, function (element, matcher, variable) {
    const regex = _matchers.regexBuilder.buildRegex(matcher);

    return this.currentPage[element].getText().then(text => {
      const matchedText = text.match(regex);

      if (matchedText === null) {
        return Promise.reject(`Could not match text ${text} with matcher ${matcher}`);
      }

      if (matchedText.length <= 1) {
        return Promise.reject(`Matcher ${matcher} does not contain capturing brackets`);
      }

      _variableStore2.default.storeVariable(variable, matchedText[1]);
    });
  });

  When(/^I click the "([^"]*)" on the first item of "([^"]*)" element$/, function (element, container) {
    return this.currentPage[container].first().element(this.currentPage[element]).click();
  });

  When(/^I wait for the "([^"]*)" element to disappear$/, function (element, sync) {
    const self = this;
    let maxRepeats = 10;

    const interval = setInterval(() => {
      console.log('Waiting for element to disappear...');

      self.currentPage.isPresent(element).then(isPresent => {
        if (!isPresent) {
          clearInterval(interval);
        }

        sync();
      });

      maxRepeats--;

      if (maxRepeats === 0) {
        clearInterval(interval);
        sync('Element is still visible');
      }
    }, 1500);
  });

  Then(/^the "([^"]*)" element is present$/, function (elementName) {
    return expect(this.currentPage.isPresent(elementName)).to.eventually.be.true;
  });

  Then(/^the "([^"]*)" element is not present$/, function (elementName) {
    return expect(this.currentPage.isPresent(elementName)).to.eventually.be.false;
  });

  Then(/^the "([^"]*)" element is visible$/, function (elementName) {
    return this.currentPage.isVisible(elementName);
  });

  Then(/^the "([^"]*)" element is not visible$/, function (elementName) {
    return this.currentPage.isVisible(elementName).then(isVisible => Promise.reject(isVisible)).catch(isVisible => {
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
    const columns = data.raw().map(element => element[0]);
    const promises = [];

    return this.currentPage[table].each(function (element) {
      const rowPromises = [];

      for (const columnIndex in columns) {
        if (columns.hasOwnProperty(columnIndex)) {
          rowPromises.push(element.element(self.currentPage[columns[columnIndex]]).getText());
        }
      }

      promises.push(Promise.all(rowPromises));
    }).then(function () {
      return Promise.all(promises).then(function (resolvedPromises) {
        _variableStore2.default.storeVariable(variableName, resolvedPromises);
      });
    });
  });

  Then(/^there are following elements in table "([^"]*)":$/, function (table, data) {
    const self = this;
    const allElements = this.currentPage[table];
    const hashes = data.hashes();

    return checkNumberOfElements.call(this, `equal ${hashes.length}`, table).then(function () {
      const promises = [];

      return allElements.each(function (element, index) {
        const hash = hashes[index];

        for (const prop in hash) {
          if (hash.hasOwnProperty(prop)) {
            const propValue = hash[prop];

            promises.push(expect(_matchers.matchers.match(element.element(self.currentPage[prop]), _variableStore2.default.replaceTextVariables(propValue))).to.eventually.be.true);
          }
        }
      }).then(function () {
        return Promise.all(promises);
      });
    });
  });

  Then(/^the "([^"]*)" popup appears$/, function (popupName) {
    const self = this;
    return expect(this.currentPage.isVisible(popupName)).to.be.eventually.fulfilled.then(function () {
      return self.currentPage.click(popupName + 'CloseBtn');
    });
  });

  Then(/^there are "([^"]*)" following elements for element "([^"]*)":$/, function (numberExpression, element, data) {
    const self = this;
    const allElements = this.currentPage[element];
    const hashedData = data.rows();

    if (hashedData.length === 0) {
      return Promise.reject('Missing element and value header columns in step.');
    }

    return checkNumberOfElements.call(this, numberExpression, element).then(function () {
      const promises = [];

      return allElements.each(function (element) {
        hashedData.forEach(function (hash) {
          promises.push(_matchers.matchers.match(element.element(self.currentPage[hash[0]]), _variableStore2.default.replaceTextVariables(hash[1])).then(result => {
            if (result) {
              return Promise.resolve();
            }

            return Promise.reject(`Expected element "${hash[0]}" to match matcher "${hash[0]}"`);
          }));
        });
      }).then(function () {
        return Promise.all(promises);
      });
    });
  });

  Then(/^there is element "([^"]*)" with value "([^"]*)"$/, function (element, value) {
    const pageElement = this.currentPage[element];

    return _matchers.matchers.match(pageElement, _variableStore2.default.replaceTextVariables(value)).then(function (matcherResult) {
      return expect(matcherResult).to.be.true;
    });
  });

  Then(/^there is no element "([^"]*)" with value "([^"]*)"$/, function (element, value) {
    const pageElement = this.currentPage[element];

    return _matchers.matchers.match(pageElement, _variableStore2.default.replaceTextVariables(value)).then(function (matcherResult) {
      return expect(matcherResult).to.be.false;
    });
  });

  function checkNumberOfElements(numberExpression, element) {
    const self = this;
    const numberPattern = /\d+/g;
    const numbers = numberExpression.match(numberPattern).map(item => parseInt(item));

    const expectFunction = function (words, numbers) {
      return expect(self.currentPage.getNumberOfElements(element)).to.eventually.be[words.pop()](...numbers);
    };

    return expectFunction(numberExpression.substr(0, numberExpression.indexOf(numbers[0]) - 1).split(' '), numbers);
  }

  Then(/^there are "([^"]*)" "([^"]*)" elements$/, checkNumberOfElements);

  Then(/^the number of "([^"]*)" elements is the same as the number of "([^"]*)" elements$/, function (firstElement, secondElement) {
    const self = this;

    return this.currentPage[secondElement].count().then(function (secondElementCount) {
      return expect(self.currentPage[firstElement].count()).to.eventually.equal(secondElementCount);
    });
  });

  Then(/^every "([^"]*)" element should have the same value for element "([^"]*)"$/, function (containerName, elementName) {
    const self = this;

    return this.currentPage[containerName].first().element(self.currentPage[elementName]).getText().then(function (firstElementText) {
      return self.currentPage[containerName].each(function (containerElement) {
        containerElement.element(self.currentPage[elementName]).getText().then(function (elementText) {
          expect(elementText).to.be.equal(firstElementText);
        });
      });
    });
  });

  Then(/^every "([^"]*)" element should have the same value for element "([^"]*)" attribute "([^"]*)"$/, function (containerName, elementName, attributeName) {
    const self = this;

    return this.currentPage[containerName].first().element(self.currentPage[elementName]).getAttribute(self.currentPage[attributeName + 'Attribute']).then(function (firstElementAttributeValue) {
      return self.currentPage[containerName].each(function (containerElement) {
        containerElement.element(self.currentPage[elementName]).getAttribute(self.currentPage[attributeName + 'Attribute']).then(function (attributeValue) {
          expect(attributeValue).to.be.equal(firstElementAttributeValue);
        });
      });
    });
  });

  Then(/^the element "([^"]*)" should have an item with values:$/, function (element, data) {
    const self = this;
    const allElements = this.currentPage[element];
    const hashedData = data.rows();

    if (hashedData.length === 0) {
      return Promise.reject('Missing element and value header columns in step.');
    }

    const promises = [];

    return allElements.each(function (element) {
      hashedData.forEach(function (hash) {
        promises.push(_matchers.matchers.match(element.element(self.currentPage[hash[0]]), _variableStore2.default.replaceTextVariables(hash[1])));
      });
    }).then(function () {
      return Promise.all(promises).then(function (resolvedPromises) {
        for (let i = 0; i < resolvedPromises.length; i += hashedData.length) {
          let allFieldsMatching = true;

          for (let j = i; j < i + hashedData.length; j++) {
            if (resolvedPromises[j] === false) {
              allFieldsMatching = false;
              break;
            }
          }

          if (allFieldsMatching) {
            return Promise.resolve();
          }
        }

        return Promise.reject('No matching element has been found.');
      });
    });
  });

  Then(/^the element "([^"]*)" should not have an item with values:$/, function (element, data) {
    const self = this;
    const allElements = this.currentPage[element];
    const hashedData = data.rows();

    if (hashedData.length === 0) {
      return Promise.reject('Missing element and value header columns in step.');
    }

    const promises = [];

    return allElements.each(function (element) {
      hashedData.forEach(function (hash) {
        promises.push(_matchers.matchers.match(element.element(self.currentPage[hash[0]]), _variableStore2.default.replaceTextVariables(hash[1])));
      });
    }).then(function () {
      return Promise.all(promises).then(function (resolvedPromises) {
        for (let i = 0; i < resolvedPromises.length; i += hashedData.length) {
          let allFieldsMatching = true;

          for (let j = i; j < i + hashedData.length; j++) {
            if (resolvedPromises[j] === false) {
              allFieldsMatching = false;
              break;
            }
          }

          if (allFieldsMatching) {
            return Promise.reject('Matching element has been found');
          }
        }

        return Promise.resolve();
      });
    });
  });

  Then(/^"([^"]*)" value on the "([^"]*)" list is sorted in "([^"]*)" order$/, function (elementValue, elementList, dependency) {
    const self = this;
    const promise = [];

    return self.currentPage[elementList].each(function (singleElement) {
      promise.push(singleElement.element(self.currentPage[elementValue]).getText());
    }).then(function () {
      return Promise.all(promise);
    }).then(function (elementsValues) {
      return _comparators.comparators.compare(elementsValues, dependency);
    });
  });

  When(/^I infinitely scroll to the "([^"]*)" element$/, function (elementName) {
    const self = this;

    const scrollToLoader = () => self.currentPage.isPresent(elementName).then(isPresent => {
      if (isPresent) {
        return self.currentPage.scrollIntoElement(elementName);
      }

      return Promise.resolve();
    }).then(() => self.currentPage.isPresent(elementName)).then(isPresent => {
      if (isPresent) {
        return browser.sleep(1000).then(() => scrollToLoader());
      }

      return Promise.resolve();
    });

    return scrollToLoader();
  });

  When(/^I set the rate:$/, function (data) {
    var _this = this;

    const table = data.rowsHash();
    const promise = [];

    Object.keys(table).forEach(ratingTitle => {
      promise.push((() => {
        var _ref = _asyncToGenerator(function* (rating) {
          const expectedRating = _this.currentPage[rating].get(parseInt(table[rating]) - 1);
          yield _this.currentPage.scrollIntoElement(rating, parseInt(table[rating]) - 1);
          yield expectedRating.click();
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      })()(ratingTitle));
    });

    return Promise.all(promise);
  });

  When(/^the rate is set:$/, function (data) {
    var _this2 = this;

    const table = data.rowsHash();
    const promise = [];

    Object.keys(table).forEach(ratingTitle => {
      promise.push((() => {
        var _ref2 = _asyncToGenerator(function* (rating) {
          const expectedRating = parseInt(table[rating]);
          const selectedRating = yield _this2.currentPage[rating].count();
          yield _this2.currentPage.scrollIntoElement(rating, parseInt(table[rating]) - 1);

          if (expectedRating !== selectedRating) {
            return Promise.reject('Values in the rating are different!');
          }

          return Promise.resolve();
        });

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      })()(ratingTitle));
    });

    return Promise.all(promise);
  });

  When(/^I press the "([^"]*)" key$/, function (key) {
    const keyTransformed = key.toUpperCase();

    return Promise.resolve(browser.actions().sendKeys(protractor.Key[keyTransformed]).perform());
  });

  When(/^I drag "([^"]*)" element and drop over "([^"]*)" element$/, (() => {
    var _ref3 = _asyncToGenerator(function* (elementDrag, elementDrop) {
      const wait = function (timeToWait) {
        return browser.sleep(timeToWait);
      };

      yield browser.actions().mouseMove(this.currentPage[elementDrag]).perform();
      yield wait(200);
      yield browser.actions().mouseDown().perform();
      yield wait(200);
      yield browser.actions().mouseMove(this.currentPage[elementDrop]).perform();
      yield wait(200);
      yield browser.actions().mouseUp().perform();
    });

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  })());
});