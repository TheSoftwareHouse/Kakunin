class CurrentUserFilter {
  isSatisfiedBy(type) {
    return type === 'currentUser';
  }

  filter(emails, type, value, world) {
    return emails.filter((email) => email.to_email === world.currentUser.account.email);
  }
}

module.exports = new CurrentUserFilter();
