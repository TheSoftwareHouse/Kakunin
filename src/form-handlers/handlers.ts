import * as formHandler from './handler';

class FormHandler implements HandlersInterface {
  private availableHandlers: HandlerInterface[];

  constructor() {
    this.availableHandlers = [
      formHandler.checkboxHandler,
      formHandler.ckEditorHandler,
      formHandler.customAngularSelectHandler,
      formHandler.defaultHandler,
      formHandler.fileHandler,
      formHandler.radioHandler,
      formHandler.selectHandler,
      formHandler.uploadedFileHandler,
    ];
  }

  public addHandler(handler) {
    this.availableHandlers.push(handler);
  }

  public async handleFill(page, elementName, desiredValue) {
    const handlers = this.getHandlers();

    for (const handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page[elementName], elementName);

      if (isSatisfied) {
        return handler.handleFill(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  }

  public async handleCheck(page, elementName, desiredValue) {
    const handlers = this.getHandlers();

    for (const handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page[elementName], elementName);

      if (isSatisfied) {
        return handler.handleCheck(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  }

  public getHandlers() {
    return this.availableHandlers.sort((handler, otherHandler) => handler.getPriority() - otherHandler.getPriority());
  }
}

export default new FormHandler();
