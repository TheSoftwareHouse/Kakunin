class UploadedFileHandler {
  isSatisfiedBy(element, elementName) {
    return Promise.resolve(elementName.endsWith('Uploaded'));
  }

  // eslint-disable-next-line no-unused-vars
  handleFill(page, elementName, desiredValue) {
    throw new Error('Not supported for this field type');
  }

  handleCheck(page, elementName, desiredValue) {
    return page[elementName].getText().then(function(text) {
      if (text.indexOf(desiredValue) >= 0) {
        return Promise.resolve();
      }

      return Promise.reject(`Expected ${desiredValue} got ${text} for file element ${elementName}`);
    });
  }

  getPriority() {
    return 998;
  }
}

export const uploadedFileHandler = new UploadedFileHandler();
