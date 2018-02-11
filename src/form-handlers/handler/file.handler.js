import path from 'path';
import config from '../../helpers/config.helper';

class FileHandler {
  isSatisfiedBy(element) {
    return element.getTagName()
      .then(function (tagName) {
        if (tagName === 'input') {
          return element.getAttribute('type').then((inputType) => inputType === 'file');
        }

        if (tagName instanceof Array) {
          return element.first().getAttribute('type').then((inputType) => inputType === 'file');
        }

        return false;
      });
  }

  handleFill(page, elementName, desiredValue) {
    const fileToUpload = path.resolve(path.join(config.projectPath, config.data, desiredValue));

    return page[elementName].sendKeys(fileToUpload);
  }

  handleCheck(page, elementName, desiredValue) {
    return page[elementName].getText().then(function (text) {
      if (text === desiredValue) {
        return Promise.resolve();
      }

      return Promise.reject(`Expected ${desiredValue} got ${text} for file element ${elementName}`);
    });
  }

  getPriority() {
    return 998;
  }
}

export const fileHandler = new FileHandler();
