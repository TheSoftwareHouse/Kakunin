const base = require('./base');
const formHandler = require('../form_handlers').formHandler;
const variableStore = require('../helpers/variableStore');

const getFormElementValidator = (formName, inputName, messageType) => {
  return element(by.css(`form[name="${formName}"] [name="${inputName}"] span[ng-message="${messageType}"]`));
};

const getClassElementValidator = (className, name, messageType) => {
  return element(by.css(`${className} [name="${name}"] [ng-message="${messageType}"]`));
};

class FormPage extends base {
  fillForm(formData) {
    const fieldsPromises = [];

    for (let property in formData) {
      if (formData.hasOwnProperty(property)) {
        fieldsPromises.push(this.fillField(property, formData[property]));
      }
    }

    return Promise.all(fieldsPromises);
  }

  checkForm(formData) {
    const fieldsPromises = [];

    for (let property in formData) {
      if (formData.hasOwnProperty(property)) {
        fieldsPromises.push(this.checkField(property, formData[property]));
      }
    }

    return Promise.all(fieldsPromises);
  }

  fillField(name, value) {
    const self = this;

    return this.getFieldType(name)
      .then(function(fieldType) {
        return formHandler.handleFill(fieldType, self, name, variableStore.replaceTextVariables(value));
      });
  }

  checkField(name, value) {
    const self = this;

    return this.getFieldType(name)
      .then(function(fieldType) {
        return formHandler.handleCheck(fieldType, self, name, value);
      });
  }

  getFieldType(name) {
    const self = this;

    return self[name].getTagName()
      .then(function(tagName) {

        const fieldType = formHandler.findFieldTypeByElementName(name);
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
          return self[name].getAttribute('type').then((inputType) => inputType);
        }

        if (tagName instanceof Array) {
          return self[name].first().getAttribute('type').then((inputType) => inputType);
        }

        return 'text';
      });
  }

  acceptDialog(dialogName, dialogAcceptCheckbox, dialogAcceptButton) {
    const self = this;

    return this.isVisible(dialogName)
      .then(function() {
        return self.click(dialogAcceptCheckbox);
      })
      .then(function() {
        return self.click(dialogAcceptButton);
      });
  }
}

module.exports = FormPage;
module.exports.getFormElementValidator = getFormElementValidator;
module.exports.getClassElementValidator = getClassElementValidator;
