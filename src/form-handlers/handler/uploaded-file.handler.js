const UploadedFileHandler = {

  registerFieldType: true,
  fieldType: 'Uploaded',

  handleFill: function (page, elementName, desiredValue) {
    throw new Error('Not supported for this field type');
  },

  handleCheck: function (page, elementName, desiredValue) {
    return page[elementName].getText().then(function (text) {
      if (text.indexOf(desiredValue) >= 0) {
        return Promise.resolve();
      }

      return Promise.reject(`Expected ${desiredValue} got ${text} for file element ${elementName}`);
    });
  }
};

export const uploadedFileHandler = UploadedFileHandler;
