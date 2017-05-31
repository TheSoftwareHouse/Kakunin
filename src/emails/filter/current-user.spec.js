import { currentUserFilter } from './current-user.filter';
import { expect } from 'chai';

const fakeWorld = {
  currentUser: {
    account: {
      email: 'some@email.com'
    }
  }
};

describe('Current user filter', () => {
  it('returns true when can be use', () => {
    expect(currentUserFilter.isSatisfiedBy('currentUser')).to.equals(true);
  });

  it('returns false when cannot be use', () => {
    expect(currentUserFilter.isSatisfiedBy('unsupportedName')).to.equals(false);
  });

  it('returns only emails for current logged user', () => {
    const fakeEmails = [
      { to_email: 'unknown@user.com' },
      { to_email: 'some@email.com' },
      { to_email: 'unknown@user.com' },
      { to_email: 'some@email.com' }
    ];

    const filteredEmails = currentUserFilter.filter(fakeEmails, 'currentUser', undefined, fakeWorld);

    expect(filteredEmails.length).to.equals(2);

    filteredEmails.forEach(
      (email) => expect(email.to_email).to.equals(fakeWorld.currentUser.account.email)
    );
  });
});
