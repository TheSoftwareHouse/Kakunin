import * as formHandler from './handler';
import { FormHandler } from './form-handler.interface';
import Base from '../pages/base';
import * as uuidv1 from 'uuid/v1';

interface AvailableHandlers {
  [key: string]: FormHandler;
}

class FormHandlers {
  constructor(
    private availableHandlers: AvailableHandlers = {
      checkbox: formHandler.checkboxHandler,
      CKEditor: formHandler.ckEditorHandler,
      customAngularSelect: formHandler.customAngularSelectHandler,
      default: formHandler.defaultHandler,
      file: formHandler.fileHandler,
      radio: formHandler.radioHandler,
      select: formHandler.selectHandler,
      uploadedFile: formHandler.uploadedFileHandler,
    }
  ) {}

  public addHandler(handler: FormHandler): void {
    const handlerName = handler.type === undefined ? uuidv1() : handler.type;

    this.availableHandlers[handlerName] = handler;
  }

  public async handleFill(
    page: Base,
    elementName: string,
    desiredValue: string,
    type?: string
  ): Promise<string | void> {
    const handlers = this.getHandlers();

    if (type && type.length > 0) {
      if (this.availableHandlers[type] === undefined) {
        return Promise.reject('The specified handler has not been found!');
      }

      return this.availableHandlers[type].handleFill(page, elementName, desiredValue);
    }

    for (const handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page.getElement(elementName), elementName);

      if (isSatisfied) {
        return handler.handleFill(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  }

  public async handleCheck(
    page: Base,
    elementName: string,
    desiredValue: string,
    type?: string
  ): Promise<string | void> {
    const handlers = this.getHandlers();

    if (type && type.length > 0) {
      if (this.availableHandlers[type] === undefined) {
        return Promise.reject('The specified handler has not been found!');
      }

      return this.availableHandlers[type].handleCheck(page, elementName, desiredValue);
    }

    for (const handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page.getElement(elementName), elementName);

      if (isSatisfied) {
        return handler.handleCheck(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  }

  public getHandlers(): FormHandler[] {
    return Object.values(this.availableHandlers).sort(
      (handler, otherHandler) => handler.getPriority() - otherHandler.getPriority()
    );
  }
}

export default new FormHandlers();
