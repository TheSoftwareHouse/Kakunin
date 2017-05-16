const fs = require('fs');
const pascalConfig = require('../helpers/pascalConfig');
const modulesLoader = require('../helpers/modulesLoader');

const availableHandlers = modulesLoader.getModules(pascalConfig.form_handlers, [__dirname + '/form_handlers']);

const FormHandler = {

  handleFill: function (fieldType, page, elementName, desiredValue) {
    return this.findHandlerByFieldType(fieldType).handleFill(page, elementName, desiredValue);
  },

  handleCheck: function (fieldType, page, elementName, desiredValue) {
    return this.findHandlerByFieldType(fieldType).handleCheck(page, elementName, desiredValue);
  },

  findHandlerByFieldType: function (fieldType) {
    for (let i = 0; i < availableHandlers.length; i++) {
      if (availableHandlers[i].fieldType === fieldType) {
        return availableHandlers[i];
      }
    }

    return this.findHandlerByFieldType('default');
  },

  findFieldTypeByElementName: function (elementName) {
    for (let i = 0; i < availableHandlers.length; i++) {
      if (availableHandlers[i].registerFieldType && elementName.indexOf(availableHandlers[i].fieldType) >= 0) {
        return availableHandlers[i].fieldType;
      }
    }

    return null;
  }

};

module.exports = FormHandler;
