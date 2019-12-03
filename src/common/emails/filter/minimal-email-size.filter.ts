class MinimalEmailSizeFilter {
  public isSatisfiedBy(type) {
    return type === 'minimalEmailSize';
  }

  public filter(emails, type, value) {
    return emails.filter(email => email.email_size >= parseInt(value));
  }
}

export const minimalEmailSizeFilter = new MinimalEmailSizeFilter();
