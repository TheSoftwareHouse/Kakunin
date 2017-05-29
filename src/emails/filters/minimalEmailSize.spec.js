const minimalEmailSize = require('./minimalEmailSize');
const chai = require('chai');
const expect = chai.expect;

describe('Minimal email size filter', () => {
  it('returns true when can be use', () => {
    expect(minimalEmailSize.isSatisfiedBy('minimalEmailSize')).to.equals(true);
  });

  it('returns false when cannot be use', () => {
    expect(minimalEmailSize.isSatisfiedBy('unsupportedName')).to.equals(false);
  });

  it('returns only emails with a minimum size', () => {
    const fakeEmails = [
      { email_size: 400 },
      { email_size: 500 },
      { email_size: 666 },
      { email_size: 30 }
    ];

    const filteredEmails = minimalEmailSize.filter(fakeEmails, 'minimalEmailSize', 500);

    expect(filteredEmails.length).to.equals(2);

    filteredEmails.forEach(
      (email) => expect(email.email_size).to.at.least(500)
    );
  });
});
