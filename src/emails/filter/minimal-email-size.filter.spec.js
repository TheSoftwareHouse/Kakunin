import { minimalEmailSizeFilter } from './minimal-email-size.filter.js';

describe('Minimal email size filter', () => {
  it('returns true when can be use', () => {
    expect(minimalEmailSizeFilter.isSatisfiedBy('minimalEmailSize')).toEqual(true);
  });

  it('returns false when cannot be use', () => {
    expect(minimalEmailSizeFilter.isSatisfiedBy('unsupportedName')).toEqual(false);
  });

  it('returns only emails with a minimum size', () => {
    const fakeEmails = [{ email_size: 400 }, { email_size: 500 }, { email_size: 666 }, { email_size: 30 }];

    const filteredEmails = minimalEmailSizeFilter.filter(fakeEmails, 'minimalEmailSize', 500);

    expect(filteredEmails.length).toEqual(2);

    filteredEmails.forEach(email => expect(email.email_size).toBeGreaterThanOrEqual(500));
  });
});
