import { fromHandlers } from '../form-handlers';
import { transformers } from '../transformers';
import Base from './base';

class FormPage extends Base {
  public async fillForm(formData) {
    for (const item of formData) {
      await this.fillField(item[0], item[1]);
    }

    return Promise.resolve();
  }

  public async checkForm(formData) {
    for (const item of formData) {
      await this.checkField(item[0], item[1]);
    }

    return Promise.resolve();
  }

  public fillField(name, value) {
    return fromHandlers.handleFill(this, name, transformers.transform(value));
  }

  public checkField(name, value) {
    return fromHandlers.handleCheck(this, name, transformers.transform(value));
  }
}

export default FormPage;
