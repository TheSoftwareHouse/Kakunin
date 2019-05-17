import { FormHandler } from '../form-handler.interface';

class UploadedFileHandler implements FormHandler {
  public readonly type = 'uploadedFile';

  public isSatisfiedBy(element, elementName) {
    return Promise.resolve(elementName.endsWith('Uploaded'));
  }

  public handleFill(page, elementName, desiredValue) {
    return Promise.reject('Not supported for this field type');
  }

  public handleCheck(page, elementName, desiredValue) {
    return page[elementName].getText().then(text => {
      if (text.indexOf(desiredValue) >= 0) {
        return Promise.resolve();
      }

      return Promise.reject(`Expected ${desiredValue} got ${text} for file element ${elementName}`);
    });
  }

  public getPriority() {
    return 998;
  }
}

export const uploadedFileHandler = new UploadedFileHandler();
