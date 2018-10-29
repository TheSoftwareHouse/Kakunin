'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _config = require('../../helpers/config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    const url = `${config.endpoint}/api/v1/inboxes/${config.inboxId}/clean?api_token=${config.apiKey}`;

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
    var _this = this;

    return _asyncToGenerator(function* () {
      const config = _this.getMailtrapConfig();
      const url = `${config.endpoint}/api/v1/inboxes/${config.inboxId}/messages?api_token=${config.apiKey}`;

      const messages = yield _this.requestClient(url).then(function (res) {
        if (res.status !== 200) {
          throw new Error(res);
        }

        return res.json();
      });

      const messagesWithBody = [];

      for (const message of messages) {
        const rawBody = yield _this.requestClient(`${config.endpoint}${message.raw_path}?api_token=${config.apiKey}`).then(function (res) {
          return res.text();
        });

        messagesWithBody.push(_extends({}, message, {
          html_body: rawBody
        }));
      }

      return messagesWithBody.filter(function (message) {
        return !message.is_read;
      });
    })();
  }

  getAttachments(email) {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/api/v1/inboxes/${config.inboxId}/messages/${email.id}/attachments?api_token=${config.apiKey}`;

    return this.requestClient(url).then(res => {
      if (res.status !== 200) {
        throw new Error(res);
      }

      return res.json();
    });
  }

  markAsRead(email) {
    const config = this.getMailtrapConfig();
    const url = `${config.endpoint}/api/v1/inboxes/${config.inboxId}/messages/${email.id}?api_token=${config.apiKey}`;

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

const create = exports.create = (requestClient = _nodeFetch2.default, config = _config2.default.email) => {
  return new MailTrapClient(requestClient, config);
};