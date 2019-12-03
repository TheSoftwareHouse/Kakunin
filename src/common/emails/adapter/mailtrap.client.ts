import * as fetch from 'node-fetch';
import configuration from '../../../core/config.helper';

class MailTrapClient {
  private requestClient: any;
  private config: any;

  constructor(requestClient, config) {
    this.requestClient = requestClient;
    this.config = config;
  }

  public isSatisfiedBy(emailConfiguration) {
    return (
      emailConfiguration.type === 'mailtrap' &&
      emailConfiguration.config.hasOwnProperty('apiKey') &&
      emailConfiguration.config.hasOwnProperty('inboxId') &&
      emailConfiguration.config.hasOwnProperty('url')
    );
  }

  public getMailtrapConfig() {
    return {
      apiKey: this.config.config.apiKey,
      inboxId: this.config.config.inboxId,
      endpoint: this.config.config.url,
    };
  }

  public clearInbox() {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/api/v1/inboxes/${config.inboxId}/clean?api_token=${config.apiKey}`;

    return this.requestClient(url, {
      method: 'PATCH',
    }).then(res => {
      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.json();
    });
  }

  public async getEmails() {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/api/v1/inboxes/${config.inboxId}/messages?api_token=${config.apiKey}`;

    const messages = await this.requestClient(url).then(res => {
      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.json();
    });

    const messagesWithBody = [];

    for (const message of messages) {
      const rawBody = await this.requestClient(`${config.endpoint}${message.raw_path}?api_token=${config.apiKey}`).then(
        res => res.text()
      );

      messagesWithBody.push({
        ...message,
        html_body: rawBody,
      });
    }

    return messagesWithBody.filter(message => !message.is_read);
  }

  public getAttachments(email) {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/api/v1/inboxes/${config.inboxId}/messages/${email.id}/attachments?api_token=${config.apiKey}`;

    return this.requestClient(url).then(res => {
      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.json();
    });
  }

  public markAsRead(email) {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/api/v1/inboxes/${config.inboxId}/messages/${email.id}?api_token=${config.apiKey}`;

    return this.requestClient(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          is_read: true,
        },
      }),
    }).then(res => {
      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.json();
    });
  }
}

export const create = (requestClient = fetch, config = configuration.email) => {
  return new MailTrapClient(requestClient, config);
};
