import { textFieldFilter } from './text-fields.filter';
import variableStore from '../../core/variable-store.helper';

describe('Text fields filter', () => {
  it('returns true when supported typ passed', () => {
    const supportedTypes = ['subject', 'from_email', 'from_name', 'to_email', 'to_name', 'html_body', 'text_body'];

    supportedTypes.forEach(type => expect(textFieldFilter.isSatisfiedBy(type)).toEqual(true));
  });

  it('returns false when not supported type passed', () => {
    expect(textFieldFilter.isSatisfiedBy('unsupportedName')).toEqual(false);
  });

  it('throws an error when value is not a regex or text matcher', () => {
    expect(() => textFieldFilter.filter(['some email content'], 'subject', 'some-value')).toThrow(
      'Comparison type not specified. Please use r: for regex and t: for text'
    );
  });

  it('returns only emails matching given value using t:v:variableName', () => {
    const fakeEmails = [
      {
        subject: 'some-subject',
        from_email: 'some@user.com',
        from_name: 'Username',
        to_email: 'other@user.com',
        to_name: 'ToUsername',
        html_body: 'Body 123',
        text_body: 'Body 123',
      },
      {
        subject: 'other-subject',
        from_email: 'my@user.com',
        from_name: 'My Username',
        to_email: 'to@user.com',
        to_name: 'Username123',
        html_body: 'Complicated body 12.12.2016',
        text_body: 'Complicated body 12.12.2016',
      },
    ];

    variableStore.storeVariable('someVariable', 'some-subject');

    const filteredEmails = textFieldFilter.filter(fakeEmails, 'subject', 't:v:someVariable');

    expect(filteredEmails.length).toEqual(1);

    filteredEmails.forEach(email => expect(email.subject === 'some-subject').toEqual(true));
  });

  it('returns only emails matching given value using r:regexpName', () => {
    const fakeEmails = [
      {
        subject: 'some-subject',
        from_email: 'some@user.com',
        from_name: 'Username',
        to_email: 'other@user.com',
        to_name: 'ToUsername',
        html_body: 'Body 123',
        text_body: 'Body 123',
      },
      {
        subject: 'other-subject',
        from_email: 'my@user.com',
        from_name: 'My Username',
        to_email: 'to@user.com',
        to_name: 'Username123',
        html_body: 'Complicated body',
        text_body: 'Complicated body',
      },
    ];

    const filteredEmails = textFieldFilter.filter(fakeEmails, 'text_body', 'r:number');

    expect(filteredEmails.length).toEqual(1);

    filteredEmails.forEach(email => expect(email.text_body === 'Body 123').toEqual(true));
  });
});
