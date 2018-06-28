import { currentUserFilter } from './current-user.filter';

const fakeWorld = {
  currentUser: {
    account: {
      email: 'some@email.com'
    }
  }
};

describe('Current user filter', () => {
  it('returns true when can be use', () => {
    expect(currentUserFilter.isSatisfiedBy('currentUser')).toEqual(true);
  });

  it('returns false when cannot be use', () => {
    expect(currentUserFilter.isSatisfiedBy('unsupportedName')).toEqual(false);
  });

  it('returns only emails for current logged user', () => {
    const fakeEmails = [
      { to_email: 'unknown@user.com' },
      { to_email: 'some@email.com' },
      { to_email: 'unknown@user.com' },
      { to_email: 'some@email.com' }
    ];

    const filteredEmails = currentUserFilter.filter(fakeEmails, 'currentUser', undefined, fakeWorld);

    expect(filteredEmails.length).toEqual(2);

    filteredEmails.forEach(
      (email) => expect(email.to_email).toEqual(fakeWorld.currentUser.account.email)
    );
  });
});
