import configuration from '../../core/config.helper';
import { create as createMailtrapAdapter } from './adapter/mailtrap.client';

class EmailService {
  private config: any;
  private availableAdapters: any;

  constructor(config, defaultAdapters) {
    this.config = config;

    this.availableAdapters = defaultAdapters;
  }

  public clearInbox() {
    const adapter = this.getAdapter();

    return adapter.clearInbox();
  }

  public getEmails() {
    const adapter = this.getAdapter();

    return adapter.getEmails();
  }

  public getAttachments(email) {
    const adapter = this.getAdapter();

    return adapter.getAttachments(email);
  }

  public markAsRead(email) {
    const adapter = this.getAdapter();

    return adapter.markAsRead(email);
  }

  public addAdapter(adapter) {
    this.availableAdapters.push(adapter);
  }

  public getAdapter() {
    const emailAdapter = this.availableAdapters.find(adapter => adapter.isSatisfiedBy(this.config.email));

    if (emailAdapter === undefined) {
      throw new Error('Could not find email adapter for given configuration.');
    }

    return emailAdapter;
  }
}

const mailtrapAdapter = createMailtrapAdapter();

export const create = (defaultAdapters: any = [mailtrapAdapter], config = configuration) => {
  return new EmailService(config, defaultAdapters);
};
