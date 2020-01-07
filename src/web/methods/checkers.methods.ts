import BasePage from '../../web/pages/base';
import { matchers } from '../../common/matchers';
import { createValueToTextTransformer } from '../../common/transformers/transformer/values-to-text.transformer';
import { TableDefinition } from 'cucumber';
import * as chai from 'chai';
import { methods } from './index';
import variableStore from '../../core/variable-store.helper';
import { ElementArrayFinder } from 'protractor';

const valueToTextTransformer = createValueToTextTransformer();

export const checkNumberOfElements = (
  currentPage: BasePage,
  numberExpression: string,
  elementName: string | ElementArrayFinder
) => {
  const numberPattern = /\d+/g;
  const numberMatches = numberExpression.match(numberPattern);
  const numbers = numberMatches.map(item => parseInt(item));

  const expectFunction = async (words, num) => {
    const numberOfElements = await currentPage.getNumberOfElements(elementName);
    return chai.expect(numberOfElements).to.be[words.pop()](...num);
  };
  return expectFunction(numberExpression.substr(0, numberExpression.indexOf(numberMatches[0]) - 1).split(' '), numbers);
};

export const checkIfElementContainsChildElementsMatchingMatchers = (
  currentPage: BasePage,
  elementName: string,
  data: TableDefinition
) => {
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

  return currentPage.waitForVisibilityOf(elementName).then(() => {
    const promises = checkers.map(check => {
      return matchers.match(currentPage.getElement(check.element), valueToTextTransformer.transform(check.matcher));
    });

    return Promise.all(promises);
  });
};

export const checkIfElementContainsValue = (
  currentPage: BasePage,
  assert: string,
  elementName: string,
  value: string
) => {
  const pageElement = currentPage.getElement(elementName);

  const checkMatcher = (ele, val) => {
    return matchers.match(ele, valueToTextTransformer.transform(val));
  };

  if (assert === 'is') {
    return currentPage.waitForVisibilityOf(elementName).then(() => {
      return checkMatcher(pageElement, value).then(matcherResult => expect(matcherResult).toBe(true));
    });
  } else if (assert === 'is not') {
    return currentPage.waitForVisibilityOf(elementName).then(() => {
      return checkMatcher(pageElement, value)
        .catch(() => Promise.resolve(false))
        .then(result => (result ? Promise.reject() : Promise.resolve()));
    });
  }
};

export const checkIfElementMatchesRegex = (
  currentPage: BasePage,
  assert: string,
  elementName: string,
  matcher: string
) => {
  const pageElement = currentPage.getElement(elementName);

  const checkMatcher = (ele, val) => {
    return matchers.match(ele, variableStore.replaceTextVariables(`r:${val}`));
  };

  if (assert === 'is') {
    return currentPage.waitForVisibilityOf(elementName).then(() => {
      return checkMatcher(pageElement, matcher).then(matcherResult => expect(matcherResult).toBe(true));
    });
  } else if (assert === 'is not') {
    return currentPage.waitForVisibilityOf(elementName).then(() => {
      return checkMatcher(pageElement, matcher)
        .catch(() => Promise.resolve(false))
        .then(result => (result ? Promise.reject() : Promise.resolve()));
    });
  }
};

export const checkIfElementMatchesMatcher = (
  currentPage: BasePage,
  assert: string,
  elementName: string,
  matcher: string
) => {
  const pageElement = currentPage.getElement(elementName);
  const checkMatcher = (ele, val) => {
    return matchers.match(ele, variableStore.replaceTextVariables(`f:${val}`));
  };

  if (assert === 'is') {
    return currentPage.waitForVisibilityOf(elementName).then(() => {
      return checkMatcher(pageElement, matcher).then(matcherResult => expect(matcherResult).toBe(true));
    });
  } else if (assert === 'is not') {
    return currentPage.waitForVisibilityOf(elementName).then(() => {
      return checkMatcher(pageElement, matcher)
        .catch(() => Promise.resolve(false))
        .then(result => (result ? Promise.reject() : Promise.resolve()));
    });
  }
};

export const checkIfElementContainsText = (
  currentPage: BasePage,
  assert: string,
  elementName: string,
  value: string
) => {
  const pageElement = currentPage.getElement(elementName);
  const checkMatcher = (ele, val) => {
    return matchers.match(ele, variableStore.replaceTextVariables(`t:${val}`));
  };

  if (assert === 'is') {
    return currentPage.waitForVisibilityOf(elementName).then(() => {
      return checkMatcher(pageElement, value);
    });
  } else if (assert === 'is not') {
    return currentPage.waitForVisibilityOf(elementName).then(() => {
      return checkMatcher(pageElement, value)
        .catch(() => Promise.resolve(false))
        .then(result => (result ? Promise.reject() : Promise.resolve()));
    });
  }
};

// checkFollowingElementsInTable
export const checkIfTableContainsElements = (currentPage: BasePage, table: string, data: TableDefinition) => {
  const allElements = currentPage.getElements(table);
  const hashes = data.hashes();
  return currentPage.waitForVisibilityOf(table).then(() => {
    return this.checkNumberOfElements(currentPage, `equal ${hashes.length}`, table).then(() => {
      const promises = [];

      return allElements
        .each((element, index) => {
          const hash = hashes[index];

          for (const prop in hash) {
            if (hash.hasOwnProperty(prop)) {
              const propValue = hash[prop];

              promises.push(
                matchers.match(
                  element.element(currentPage.getElement(prop).locator()),
                  valueToTextTransformer.transform(propValue)
                )
              );
            }
          }
        })
        .then(() => Promise.all(promises));
    });
  });
};

export const checkIfTableElementContainsMatchingNumberOfElements = (
  currentPage: BasePage,
  numberExpression: string,
  elementName: string,
  data: TableDefinition
) => {
  const allElements = currentPage.getElements(elementName);
  const hashedData = data.raw();

  if (hashedData.length === 0) {
    return Promise.reject('Missing table under the step.');
  }
  return currentPage.waitForVisibilityOf(elementName).then(() => {
    return this.checkNumberOfElements(currentPage, numberExpression, elementName).then(() => {
      const promises = [];

      return allElements
        .each(element => {
          hashedData.forEach(hash => {
            promises.push(
              matchers.match(
                element.element(currentPage.getElement(hash[0]).locator()),
                valueToTextTransformer.transform(hash[1])
              )
            );
          });
        })
        .then(() => Promise.all(promises));
    });
  });
};

export const checkIfAllElementsHaveMatchingValues = (
  currentPage: BasePage,
  containerName: string,
  elementName: string
) => {
  return currentPage.waitForVisibilityOf(containerName).then(() => {
    return currentPage
      .getElements(containerName)
      .first()
      .element(currentPage.getElement(elementName).locator())
      .getText()
      .then(firstElementText => {
        return currentPage.getElements(containerName).each(containerElement => {
          containerElement
            .element(currentPage.getElement(elementName).locator())
            .getText()
            .then(elementText => {
              expect(elementText).toEqual(firstElementText);
            });
        });
      });
  });
};

export const checkIfElementHaveItemsWithValue = (
  currentPage: BasePage,
  elementName: string,
  assertion: string,
  data: TableDefinition
) => {
  const allElements = currentPage.getElements(elementName);
  const hashedData = data.raw();

  if (hashedData.length === 0) {
    return Promise.reject('Missing table under the step.');
  }

  const promises = [];
  return currentPage
    .waitForVisibilityOf(elementName)
    .then(() =>
      allElements.each(element => {
        hashedData.forEach(hash => {
          promises.push(
            matchers
              .match(
                element.element(currentPage.getElement(hash[0]).locator()),
                valueToTextTransformer.transform(hash[1])
              )
              .catch(() => false)
          );
        });
      })
    )
    .then(() => {
      if (assertion === 'have') {
        Promise.all(promises).then(
          methods.shared.handlePromises(
            hashedData,
            () => Promise.resolve(),
            () => Promise.reject('No matching element has been found.')
          )
        );
      } else if (assertion === 'not have') {
        Promise.all(promises).then(
          methods.shared.handlePromises(
            hashedData,
            () => Promise.reject('Matching element has been found'),
            () => Promise.resolve()
          )
        );
      }
    });
};
