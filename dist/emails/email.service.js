'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _config = require('../helpers/config.helper');

var _config2 = _interopRequireDefault(_config);

var _mailtrapClient = require('./adapter/mailtrap.client.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    const adapter = this.availableAdapters.find(adapter => adapter.isSatisfiedBy(this.config));

    if (adapter === undefined) {
      throw new Error(`Could not find email adapter for given configuration.`);
    }

    return adapter;
  }
}

const mailtrapAdapter = (0, _mailtrapClient.create)();

const create = exports.create = (defaultAdapters = [mailtrapAdapter], config = _config2.default) => new EmailService(config, defaultAdapters);