import BasePage from '../../pages/base';
import { matchers } from '../../matchers';
import { createValueToTextTransformer } from '../../transformers/transformer/values-to-text.transformer';
import { TableDefinition } from 'cucumber';
import * as chai from 'chai';
import { methods } from './index';

const valueToTextTransformer = createValueToTextTransformer();

export const checkNumberOfElements = (currentPage: BasePage, numberExpression: string, element: string) => {
  const numberPattern = /\d+/g;
  const numberMatches = numberExpression.match(numberPattern);
  const numbers = numberMatches.map(item => parseInt(item));

  const expectFunction = async (words, num) => {
    const numberOfElements = await currentPage.getNumberOfElements(element);
    return chai.expect(numberOfElements).to.be[words.pop()](...num);
  };
  return expectFunction(numberExpression.substr(0, numberExpression.indexOf(numberMatches[0]) - 1).split(' '), numbers);
};

export const checkFollowingElementsInTable = (currentPage: BasePage, table: string, data: TableDefinition) => {
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

export const checkFollowingElementsForElement = (
  currentPage: BasePage,
  numberExpression: string,
  elementName,
  data
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

export const checkElementsHaveSameValueForElement = (
  currentPage: BasePage,
  containerName: string,
  elementName: string
) => {
  return currentPage.waitForVisibilityOf(containerName).then(() => {
    return this.currentPage
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

export const checkElementHaveItemsWithValue = (
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
