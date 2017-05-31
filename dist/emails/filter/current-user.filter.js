'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// TODO: stop injecting world here and use some kind of a user provider

class CurrentUserFilter {
  isSatisfiedBy(type) {
    return type === 'currentUser';
  }

  filter(emails, type, value, world) {
    return emails.filter(email => email.to_email === world.currentUser.account.email);
  }
}

const currentUserFilter = exports.currentUserFilter = new CurrentUserFilter();