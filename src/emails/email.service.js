import configuration from '../helpers/config.helper';
import { create as createMailtrapAdapter } from './adapter/mailtrap.client.js';

class EmailService {
  constructor(config, defaultAdapters) {
    this.config = config;

    this.availableAdapters = defaultAdapters;
  }

  clearInbox() {
    const adapter = this.getAdapter();

    return adapter.clearInbox();
  }

  getEmails() {
    const adapter = this.getAdapter();

    return adapter.getEmails();
  }

  getAttachments(email) {
    const adapter = this.getAdapter();

    return adapter.getAttachments(email);
  }

  markAsRead(email) {
    const adapter = this.getAdapter();

    return adapter.markAsRead(email);
  }

  addAdapter(adapter) {
    this.availableAdapters.push(adapter);
  }

  getAdapter() {
    const emailAdapter = this.availableAdapters.find(adapter => adapter.isSatisfiedBy(this.config.email));

    if (emailAdapter === undefined) {
      throw new Error('Could not find email adapter for given configuration.');
    }

    return emailAdapter;
  }
}

const mailtrapAdapter = createMailtrapAdapter();

export const create = (defaultAdapters = [mailtrapAdapter], config = configuration) => {
  return new EmailService(config, defaultAdapters);
};
