// TODO: stop injecting world here and use some kind of a user provider

class CurrentUserFilter {
  public isSatisfiedBy(type) {
    return type === 'currentUser';
  }

  public filter(emails, type, value, world) {
    return emails.filter((email) => email.to_email === world.currentUser.account.email);
  }
}

export const currentUserFilter = new CurrentUserFilter();
