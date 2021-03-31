import variableStore from '../../core/variable-store.helper';
import { methods } from './index';
import { regexBuilder } from '../../common/matchers';
import BasePage from '../pages/base';
import { TableDefinition } from 'cucumber';

export const storeTextAsVariable = (currentPage: BasePage, elementName: string, variable: string) => {
  return currentPage.waitForVisibilityOf(elementName).then(async () => {
    const elementTag = await currentPage[elementName].getTagName((tag) => tag);
    const value = await methods.shared.getElementValue(currentPage, elementName);

    if (elementTag === 'input' || elementTag === 'textarea') {
      return variableStore.storeVariable(variable, value);
    }

    return variableStore.storeVariable(variable, value);
  });
};

export const updateStoredTextAsVariable = (currentPage: BasePage, elementName: string, variable: string) => {
  return currentPage.waitForVisibilityOf(elementName).then(async () => {
    const text = await methods.shared.getElementText(currentPage, elementName);

    return variableStore.updateVariable(variable, text);
  });
};

export const storeTextMatchedByAsVariable = (
  currentPage: BasePage,
  elementName: string,
  matcher: string,
  variable: string
) => {
  const regex = regexBuilder.buildRegex(matcher);

  return currentPage.waitForVisibilityOf(elementName).then(async () => {
    const text = await methods.shared.getElementText(currentPage, elementName);
    const matchedText = text.match(regex);

    if (matchedText === null) {
      return Promise.reject(`Could not match text ${text} with matcher ${matcher}`);
    }

    if (matchedText.length <= 1) {
      return Promise.reject(`Matcher ${matcher} does not contain capturing brackets`);
    }

    return variableStore.storeVariable(variable, matchedText[1]);
  });
};

export const storeTableRowsWithColumnsAsVariable = (
  currentPage: BasePage,
  table: string,
  variableName: string,
  data: TableDefinition
) => {
  const columns = data.raw().map((element) => element[0]);
  const promises = [];
  return currentPage.waitForVisibilityOf(table).then(() => {
    return currentPage
      .getElement(table)
      .each((element) => {
        const rowPromises = [];

        for (const columnIndex in columns) {
          if (columns.hasOwnProperty(columnIndex)) {
            rowPromises.push(element.element(currentPage.getElement(columns[columnIndex]).locator()).getText());
          }
        }

        promises.push(Promise.all(rowPromises));
      })
      .then(() =>
        Promise.all(promises).then((resolvedPromises) => {
          variableStore.storeVariable(variableName, resolvedPromises);
        })
      );
  });
};
