import * as formHandler from './handler';
import { FormHandler } from './form-handler.interface';
import Base from '../pages/base';

class FormHandlers {
  constructor(
    private availableHandlers: FormHandler[] = [
      formHandler.checkboxHandler,
      formHandler.ckEditorHandler,
      formHandler.customAngularSelectHandler,
      formHandler.defaultHandler,
      formHandler.fileHandler,
      formHandler.radioHandler,
      formHandler.selectHandler,
      formHandler.uploadedFileHandler,
    ]
  ) {}

  public addHandler(handler: FormHandler): void {
    this.availableHandlers.push(handler);
  }

  public async handleFill(page: Base, elementName: string, desiredValue: string): Promise<string | void> {
    const handlers = this.getHandlers();

    for (const handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page.getElement(elementName), elementName);

      if (isSatisfied) {
        return handler.handleFill(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  }

  public async handleCheck(page: Base, elementName: string, desiredValue: string): Promise<string | void> {
    const handlers = this.getHandlers();

    for (const handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page.getElement(elementName), elementName);

      if (isSatisfied) {
        return handler.handleCheck(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  }

  public getHandlers(): FormHandler[] {
    return this.availableHandlers.sort((handler, otherHandler) => handler.getPriority() - otherHandler.getPriority());
  }
}

export default new FormHandlers();
