'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class MinimalEmailSizeFilter {
  isSatisfiedBy(type) {
    return type === 'minimalEmailSize';
  }

  // eslint-disable-next-line no-unused-vars
  filter(emails, type, value, world) {
    return emails.filter(email => email.email_size >= parseInt(value));
  }
}

const minimalEmailSizeFilter = exports.minimalEmailSizeFilter = new MinimalEmailSizeFilter();