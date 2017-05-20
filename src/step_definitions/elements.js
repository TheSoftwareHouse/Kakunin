const matchers = require('../matchers').matchers;
const variableStore = require('../helpers/variableStore');
const regexBuilder = require('../matchers/matchers/regexMatcher/regexBuilder');
const comparators = require('../comparators').comparators;
const pascalConfig = require('../helpers/pascalConfig');

module.exports = function () {
  this.When('I wait for "$condition" of the "$elementName" element', function (condition, elementName) {
    const timeout = parseInt(pascalConfig.elementsVisibilityTimeout) * 1000;
    return browser.wait(protractor.ExpectedConditions[condition](this.currentPage[elementName], timeout));
  });

  this.When('I scroll to the "$elementName" element', function (elementName) {
    return this.currentPage.scrollIntoElement(elementName);
  });

  this.When('I click the "$elementName" element', function (elementName) {
    const self = this;

    return self.currentPage.scrollIntoElement(elementName)
      .then(function () {
        return self.currentPage.click(elementName)
          .then(
            null,
            function () {
              console.warn('Warning! Element was not clickable. We need to scroll it down.');
              return browser.executeScript('window.scrollBy(0,50);')
                .then(function () {
                  return self.currentPage.click(elementName)
                    .then(
                      null,
                      function () {
                        return Promise.reject(`Error, after scrolling the element "${elementName}" is still not clickable.`);
                      }
                    );
                });
            }
          );
      });
  });

  this.When('I click the "$elementName" "$parameter" element', function (elementName, parameter) {
    const self = this;

    return browser.executeScript('arguments[0].scrollIntoView(false);', this.currentPage[elementName](parameter).getWebElement())
      .then(function () {
        return self.currentPage[elementName](parameter).click();
      });
  });

  this.When('I click the "$elementName" element if it is visible', function (elementName) {
    const self = this;

    return this.currentPage.isVisible(elementName).then(function () {
      return self.currentPage.scrollIntoElement(elementName)
          .then(function () {
            return self.currentPage.click(elementName);
          });
    }).catch(function () {
      return Promise.resolve();
    });
  });

  this.When('I store the "$element" element text as "$variable" variable', function (element, variable) {
    return this.currentPage[element].getText().then((text) => { variableStore.storeVariable(variable, text); });
  });

  this.When('I store the "$element" element text matched by "$matcher" as "$variable" variable', function (element, matcher, variable) {
    const regex = regexBuilder.buildRegex(matcher);

    return this.currentPage[element].getText().then((text) => {
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

  this.When('I click the "$element" on the first item of "$container" element', function (element, container) {
    return this.currentPage[container].first().element(this.currentPage[element]).click();
  });

  this.When('I wait for the "$elementName" element to disappear', function (element, sync) {
    const self = this;
    let maxRepeats = 10;

    const interval = setInterval(() => {
      console.log('Waiting for element to disappear...');

      self.currentPage.isPresent(element).then((isPresent) => {
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

  this.Then('the "$elementName" element is present', function (elementName) {
    return expect(this.currentPage.isPresent(elementName)).to.eventually.be.true;
  });

  this.Then('the "$elementName" element is not present', function (elementName) {
    return expect(this.currentPage.isPresent(elementName)).to.eventually.be.false;
  });

  this.Then('the "$elementName" element is visible', function (elementName) {
    return this.currentPage.isVisible(elementName);
  });

  this.Then('the "$elementName" element is not visible', function (elementName) {
    return expect(this.currentPage.isVisible(elementName)).to.eventually.be.false;
  });

  this.Then('the "$elementName" element is disabled', function (elementName) {
    return expect(this.currentPage.isDisabled(elementName)).to.eventually.be.true;
  });

  this.When('I store table "$table" rows as "$variableName" with columns:', function (table, variableName, data) {
    const self = this;
    const columns = data.raw().map((element) => element[0]);
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
        variableStore.storeVariable(variableName, resolvedPromises);
      });
    });
  });

  this.Then('there are following elements in table "$table":', function (table, data) {
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

            promises.push(expect(matchers.match(element.element(self.currentPage[prop]), variableStore.replaceTextVariables(propValue))).to.eventually.be.true);
          }
        }
      }).then(function () {
        return Promise.all(promises);
      });
    });
  });

  this.Then('the "$popupName" popup appears', function (popupName) {
    const self = this;
    return expect(this.currentPage.isVisible(popupName)).to.be.eventually.fulfilled.then(function () {
      return self.currentPage.click(popupName + 'CloseBtn');
    });
  });

  this.Then('there are "$numberExpression" following elements for element "$element":', function (numberExpression, element, data) {
    const self = this;
    const allElements = this.currentPage[element];
    const hashedData = data.hashes();

    if (hashedData.length === 0) {
      return Promise.reject('Missing element and value header columns in step.');
    }

    return checkNumberOfElements.call(this, numberExpression, element).then(function () {
      const promises = [];

      return allElements.each(function (element) {
        hashedData.forEach(function (hash) {
          promises.push(expect(matchers.match(
            element.element(self.currentPage[hash.element]),
            variableStore.replaceTextVariables(hash.value))).to.eventually.be.true
          );
        });
      }).then(function () {
        return Promise.all(promises);
      });
    });
  });

  this.Then('there is element "$element" with value "$value"', function (element, value) {
    const pageElement = this.currentPage[element];

    return matchers.match(pageElement, variableStore.replaceTextVariables(value)).then(function (matcherResult) {
      return expect(matcherResult).to.be.true;
    });
  });

  this.Then('there is no element "$element" with value "$value"', function (element, value) {
    const pageElement = this.currentPage[element];

    return matchers.match(pageElement, variableStore.replaceTextVariables(value)).then(function (matcherResult) {
      return expect(matcherResult).to.be.false;
    });
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

  this.Then('there are "$numberExpression" "$elementName" elements', checkNumberOfElements);

  this.Then('the number of "$firstElement" elements is the same as the number of "$secondElement" elements', function (firstElement, secondElement) {
    const self = this;

    return this.currentPage[secondElement].count().then(function (secondElementCount) {
      return expect(self.currentPage[firstElement].count()).to.eventually.equal(secondElementCount);
    });
  });

  this.Then('every "$containerName" element should have the same value for element "$elementName"', function (containerName, elementName) {
    const self = this;

    return this.currentPage[containerName]
      .first()
      .element(self.currentPage[elementName])
      .getText()
      .then(
        function (firstElementText) {
          return self.currentPage[containerName].each(function (containerElement) {
            containerElement.element(self.currentPage[elementName]).getText().then(
              function (elementText) {
                expect(elementText).to.be.equal(firstElementText);
              }
            );
          });
        }
      );
  });

  this.Then('every "$containerName" element should have the same value for element "$elementName" attribute "$attributeName"', function (containerName, elementName, attributeName) {
    const self = this;

    return this.currentPage[containerName]
      .first()
      .element(self.currentPage[elementName])
      .getAttribute(self.currentPage[attributeName + 'Attribute'])
      .then(
        function (firstElementAttributeValue) {
          return self.currentPage[containerName].each(function (containerElement) {
            containerElement.element(self.currentPage[elementName]).getAttribute(self.currentPage[attributeName + 'Attribute']).then(
              function (attributeValue) {
                expect(attributeValue).to.be.equal(firstElementAttributeValue);
              }
            );
          });
        }
      );
  });

  this.Then('the element "$element" should have an item with values:', function (element, data) {
    const self = this;
    const allElements = this.currentPage[element];
    const hashedData = data.hashes();

    if (hashedData.length === 0) {
      return Promise.reject('Missing element and value header columns in step.');
    }

    const promises = [];

    return allElements.each(function (element) {
      hashedData.forEach(function (hash) {
        promises.push(matchers.match(
          element.element(self.currentPage[hash.element]),
          variableStore.replaceTextVariables(hash.value))
        );
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

  this.Then('the element "$element" should not have an item with values:', function (element, data) {
    const self = this;
    const allElements = this.currentPage[element];
    const hashedData = data.hashes();

    if (hashedData.length === 0) {
      return Promise.reject('Missing element and value header columns in step.');
    }

    const promises = [];

    return allElements.each(function (element) {
      hashedData.forEach(function (hash) {
        promises.push(matchers.match(
          element.element(self.currentPage[hash.element]),
          variableStore.replaceTextVariables(hash.value))
        );
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

  this.Then('"$elementValue" value on the "$elementList" list is sorted in "$dependency" order', function (elementValue, elementList, dependency) {
    const self = this;
    const promise = [];

    return self.currentPage[elementList].each(function (singleElement) {
      promise.push(singleElement.element(self.currentPage[elementValue]).getText());
    }).then(function () {
      return Promise.all(promise);
    }).then(function (elementsValues) {
      return comparators.compare(elementsValues, dependency);
    });
  });

  this.When('I infinitely scroll to the "$loader" element', function (elementName) {
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

  this.When('I set the rate:', function (data) {
    const table = data.rowsHash();
    const promise = [];

    Object.keys(table).forEach((ratingTitle) => {
      promise.push(
        (async (rating) => {
          const expectedRating = this.currentPage[rating].get(parseInt(table[rating]) - 1);
          await this.currentPage.scrollIntoElement(rating, parseInt(table[rating]) - 1);
          await expectedRating.click();
        })(ratingTitle)
      );
    });

    return Promise.all(promise);
  });

  this.When('the rate is set:', function (data) {
    const table = data.rowsHash();
    const promise = [];

    Object.keys(table).forEach((ratingTitle) => {
      promise.push(
        (async (rating) => {
          const expectedRating = parseInt(table[rating]);
          const selectedRating = await this.currentPage[rating].count();
          await this.currentPage.scrollIntoElement(rating, parseInt(table[rating]) - 1);

          if (expectedRating !== selectedRating) {
            return Promise.reject('Values in the rating are different!')
          }

          return Promise.resolve();
        })(ratingTitle)
      );
    });

    return Promise.all(promise);
  });
};
