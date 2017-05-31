import fetch from 'node-fetch';

class MailTrapClient {
  constructor(requestClient) {
    this.requestClient = requestClient;
  }

  getMailtrapConfig() {
    if (typeof process.env.MAILTRAP_API_KEY === 'undefined') {
      throw new Error('Missing mailtrap api key. Use export MAILTRAP_API_KEY=your-api-key for setup.');
    }

    if (typeof process.env.MAILTRAP_INBOX_ID === 'undefined') {
      throw new Error('Missing mailtrap inbox id. Use export MAILTRAP_INBOX_ID=your-inbox-id for setup.');
    }

    if (typeof process.env.MAILTRAP_URL === 'undefined') {
      throw new Error('Missing mailtrap endpoint url. Use export MAILTRAP_URL=your-endpoint-url for setup.');
    }

    return {
      apiKey: process.env.MAILTRAP_API_KEY,
      inboxId: process.env.MAILTRAP_INBOX_ID,
      endpoint: process.env.MAILTRAP_URL
    };
  }

  clearInbox() {
    const config = this.getMailtrapConfig();
    const url = config.endpoint + '/inboxes/' + config.inboxId + '/clean?api_token=' + config.apiKey;

    return this.requestClient(url, {
      method: 'PATCH'
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res);
        }

        return res.json();
      });
  }

  getEmails() {
    const config = this.getMailtrapConfig();
    const url = config.endpoint + '/inboxes/' + config.inboxId + '/messages?api_token=' + config.apiKey;

    return this.requestClient(url)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res);
        }

        return res.json();
      })
      .then((data) => data.filter((email) => !email.is_read));
  }

  getAttachments(email) {
    const config = this.getMailtrapConfig();
    const url = config.endpoint + '/inboxes/' + config.inboxId + '/messages/' + email.id + '/attachments' + '?api_token=' + config.apiKey;

    return this.requestClient(url)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res);
        }

        return res.json();
      });
  }

  markAsRead(email) {
    const config = this.getMailtrapConfig();
    const url = config.endpoint + '/inboxes/' + config.inboxId + '/messages/' + email.id + '?api_token=' + config.apiKey;

    return this.requestClient(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: {
          is_read: true
        }
      })
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res);
        }

        return res.json();
      });
  }
}

export const create = (requestClient = fetch) => new MailTrapClient(requestClient);
