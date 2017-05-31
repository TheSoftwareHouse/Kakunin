'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassElementValidator = exports.getFormElementValidator = undefined;

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _formHandlers = require('../form-handlers');

var _variableStore = require('../helpers/variable-store.helper');

var _variableStore2 = _interopRequireDefault(_variableStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFormElementValidator = exports.getFormElementValidator = (formName, inputName, messageType) => {
  return element(by.css(`form[name="${formName}"] [name="${inputName}"] span[ng-message="${messageType}"]`));
};

const getClassElementValidator = exports.getClassElementValidator = (className, name, messageType) => {
  return element(by.css(`${className} [name="${name}"] [ng-message="${messageType}"]`));
};

class FormPage extends _base2.default {
  fillForm(formData) {
    const fieldsPromises = [];
    formData.forEach(item => fieldsPromises.push(this.fillField(item[0], item[1])));

    return Promise.all(fieldsPromises);
  }

  checkForm(formData) {
    const fieldsPromises = [];
    formData.forEach(item => fieldsPromises.push(this.checkField(item[0], item[1])));

    return Promise.all(fieldsPromises);
  }

  fillField(name, value) {
    const self = this;

    return this.getFieldType(name).then(function (fieldType) {
      return _formHandlers.fromHandlers.handleFill(fieldType, self, name, _variableStore2.default.replaceTextVariables(value));
    });
  }

  checkField(name, value) {
    const self = this;

    return this.getFieldType(name).then(function (fieldType) {
      return _formHandlers.fromHandlers.handleCheck(fieldType, self, name, value);
    });
  }

  getFieldType(name) {
    const self = this;

    return self[name].getTagName().then(function (tagName) {
      const fieldType = _formHandlers.fromHandlers.findFieldTypeByElementName(name);
      if (fieldType !== null) {
        return fieldType;
      }

      if (tagName.indexOf('select-field') >= 0) {
        return 'CustomAngularSelect';
      }

      if (tagName === 'select') {
        return 'select';
      }

      if (tagName === 'input') {
        return self[name].getAttribute('type').then(inputType => inputType);
      }

      if (tagName instanceof Array) {
        return self[name].first().getAttribute('type').then(inputType => inputType);
      }

      return 'text';
    });
  }

  acceptDialog(dialogName, dialogAcceptCheckbox, dialogAcceptButton) {
    const self = this;

    return this.isVisible(dialogName).then(function () {
      return self.click(dialogAcceptCheckbox);
    }).then(function () {
      return self.click(dialogAcceptButton);
    });
  }
}

exports.default = FormPage;