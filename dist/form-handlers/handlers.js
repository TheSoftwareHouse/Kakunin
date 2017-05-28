'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handler = require('./handler');

var formHandler = _interopRequireWildcard(_handler);

var _modulesLoader = require('../helpers/modules-loader.helper');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const modulesLoader = (0, _modulesLoader.create)();

const availableHandlers = [formHandler.checkboxHandler, formHandler.ckEditorHandler, formHandler.customAngularSelectHandler, formHandler.datePickerHandler, formHandler.defaultHandler, formHandler.fileHandler, formHandler.radioHandler, formHandler.selectHandler, formHandler.timePickerHandler, formHandler.uploadedFileHandler, ...modulesLoader.getModules('form_handlers')];

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

exports.default = FormHandler;