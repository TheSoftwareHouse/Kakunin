import * as formHandler from './handler';

const availableHandlers = [
  formHandler.checkboxHandler,
  formHandler.ckEditorHandler,
  formHandler.customAngularSelectHandler,
  formHandler.defaultHandler,
  formHandler.fileHandler,
  formHandler.radioHandler,
  formHandler.selectHandler,
  formHandler.uploadedFileHandler
];

const FormHandler = {
  addHandler: function(handler) {
    availableHandlers.push(handler);
  },

  handleFill: async function (page, elementName, desiredValue) {
    const handlers = this.getHandlers();

    for (let handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page[elementName], elementName);

      if (isSatisfied) {
        return handler.handleFill(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  },

  handleCheck: async function (page, elementName, desiredValue) {
    const handlers = this.getHandlers();

    for (let handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page[elementName], elementName);

      if (isSatisfied) {
        return handler.handleCheck(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  },

  getHandlers: function() {
    return availableHandlers.sort((handler, otherHandler) => handler.getPriority() - otherHandler.getPriority());
  }
};

export default FormHandler;
