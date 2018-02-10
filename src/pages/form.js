import Base from './base';
import { fromHandlers } from '../form-handlers';
import { transformers } from '../transformers';

class FormPage extends Base {
  async fillForm(formData) {
    for (let item of formData) {
      await this.fillField(item[0], item[1]);
    }

    return Promise.resolve();
  }

  async checkForm(formData) {
    for (let item of formData) {
      await this.checkField(item[0], item[1]);
    }

    return Promise.resolve();
  }

  fillField(name, value) {
    return fromHandlers.handleFill(this, name, transformers.transform(value));
  }

  checkField(name, value) {
    return fromHandlers.handleCheck(this, name, transformers.transform(value));
  }
}

export default FormPage;
