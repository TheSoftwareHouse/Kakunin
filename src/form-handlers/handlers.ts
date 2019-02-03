import * as formHandler from './handler';

const availableHandlers = [
  formHandler.checkboxHandler,
  formHandler.ckEditorHandler,
  formHandler.customAngularSelectHandler,
  formHandler.defaultHandler,
  formHandler.fileHandler,
  formHandler.radioHandler,
  formHandler.selectHandler,
  formHandler.uploadedFileHandler,
];

const FormHandler = {
  addHandler(handler) {
    availableHandlers.push(handler);
  },

  async handleFill(page, elementName, desiredValue) {
    const handlers = this.getHandlers();

    for (const handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page[elementName], elementName);

      if (isSatisfied) {
        return handler.handleFill(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  },

  async handleCheck(page, elementName, desiredValue) {
    const handlers = this.getHandlers();

    for (const handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page[elementName], elementName);

      if (isSatisfied) {
        return handler.handleCheck(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  },

  getHandlers() {
    return availableHandlers.sort((handler, otherHandler) => handler.getPriority() - otherHandler.getPriority());
  },
};

export default FormHandler;
