const path = require('path');
const pascalConfig = require('../../helpers/pascalConfig');

const FileHandler = {

  registerFieldType: false,
  fieldType: 'file',

  handleFill: function(page, elementName, desiredValue) {
    const fileToUpload = path.resolve(pascalConfig.projectPath + pascalConfig.data + '/' + desiredValue);

    return page[elementName].sendKeys(fileToUpload);
  },

  handleCheck: function(page, elementName, desiredValue) {
    return page[elementName].getText().then(function(text) {
      if (text === desiredValue) {
        return Promise.resolve();
      }

      return Promise.reject(`Expected ${desiredValue} got ${text} for file element ${elementName}`);
    });
  }
};

module.exports = FileHandler;
