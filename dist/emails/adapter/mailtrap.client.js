'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _url = require('url');

var _config = require('../../helpers/config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MailTrapClient {
  constructor(requestClient, config) {
    this.requestClient = requestClient;
    this.config = config;
  }

  isSatisfiedBy(emailConfiguration) {
    return emailConfiguration.type === 'mailtrap' && emailConfiguration.config.hasOwnProperty('apiKey') && emailConfiguration.config.hasOwnProperty('inboxId') && emailConfiguration.config.hasOwnProperty('url');
  }

  getMailtrapConfig() {
    return {
      apiKey: this.config.config.apiKey,
      inboxId: this.config.config.inboxId,
      endpoint: this.config.config.url
    };
  }

  clearInbox() {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/inboxes/${config.inboxId}/clean?api_token=${config.apiKey}`;

    return this.requestClient(url, {
      method: 'PATCH'
    }).then(res => {
      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.json();
    });
  }

  getEmails() {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/inboxes/${config.inboxId}/messages?api_token=${config.apiKey}`;

    return this.requestClient(url).then(res => {
      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.json();
    }).then(data => data.filter(email => !email.is_read));
  }

  getAttachments(email) {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/inboxes/${config.inboxId}/messages/${email.id}/attachments?api_token=${config.apiKey}`;

    return this.requestClient(url).then(res => {
      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.json();
    });
  }

  markAsRead(email) {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/inboxes/${config.inboxId}/messages/${email.id}?api_token=${config.apiKey}`;

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
    }).then(res => {
      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.json();
    });
  }
}

const create = exports.create = (requestClient = _nodeFetch2.default, config = _config2.default.email) => new MailTrapClient(requestClient, config);