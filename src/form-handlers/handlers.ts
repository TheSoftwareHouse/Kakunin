import * as formHandler from './handler';
import { FormHandler } from './form-handler.interface';
import Base from '../pages/base';

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
    this.availableHandlers[handler.type] = handler;
  }

  public async handleFill(
    page: Base,
    elementName: string,
    desiredValue: string,
    type?: string
  ): Promise<string | void> {
    return this.handleHandler(page, elementName, desiredValue, type, 'handleFill');
  }

  public async handleCheck(
    page: Base,
    elementName: string,
    desiredValue: string,
    type?: string
  ): Promise<string | void> {
    return this.handleHandler(page, elementName, desiredValue, type, 'handleCheck');
  }

  public getHandlers(): FormHandler[] {
    return Object.values(this.availableHandlers).sort(
      (handler, otherHandler) => handler.getPriority() - otherHandler.getPriority()
    );
  }

  private async handleHandler(
    page: Base,
    elementName: string,
    desiredValue: string,
    type?: string,
    handlerMethodName?: string
  ): Promise<string | void> {
    const handlers = this.getHandlers();

    if (type && type.length > 0) {
      if (this.availableHandlers[type] === undefined) {
        return Promise.reject('The specified handler has not been found!');
      }

      return handlerMethodName === 'handleFill'
        ? this.availableHandlers[type].handleFill(page, elementName, desiredValue)
        : this.availableHandlers[type].handleCheck(page, elementName, desiredValue);
    }

    for (const handler of handlers) {
      const isSatisfied = await handler.isSatisfiedBy(page.getElement(elementName), elementName);

      if (isSatisfied) {
        return handlerMethodName === 'handleFill'
          ? handler.handleFill(page, elementName, desiredValue)
          : handler.handleCheck(page, elementName, desiredValue);
      }
    }

    return Promise.reject('Could not find matching handler.');
  }
}

export default new FormHandlers();
