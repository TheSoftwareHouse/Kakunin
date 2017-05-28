import { minimalEmailSizeFilter } from './minimal-email-size.filter.js';
import { expect } from 'chai';
describe('Minimal email size filter', () => {
  it('returns true when can be use', () => {
    expect(minimalEmailSizeFilter.isSatisfiedBy('minimalEmailSize')).to.equals(true);
  });

  it('returns false when cannot be use', () => {
    expect(minimalEmailSizeFilter.isSatisfiedBy('unsupportedName')).to.equals(false);
  });

  it('returns only emails with a minimum size', () => {
    const fakeEmails = [
      { email_size: 400 },
      { email_size: 500 },
      { email_size: 666 },
      { email_size: 30 }
    ];

    const filteredEmails = minimalEmailSizeFilter.filter(fakeEmails, 'minimalEmailSize', 500);

    expect(filteredEmails.length).to.equals(2);

    filteredEmails.forEach(
      (email) => expect(email.email_size).to.at.least(500)
    );
  });
});
