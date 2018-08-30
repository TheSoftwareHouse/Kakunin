import { create } from './mailtrap.client';
import fetchMock from 'fetch-mock';

describe('Mailtrap client', () => {
  it('it returns mailtrap config', () => {
    const mailtrapClient = create(undefined, {
      config: {
        apiKey: 'fake-api-key',
        inboxId: 'fake-inbox-id',
        url: 'http://fake-url.com'
      }
    });

    expect(mailtrapClient.getMailtrapConfig())
      .toEqual({
        apiKey: 'fake-api-key',
        inboxId: 'fake-inbox-id',
        endpoint: 'http://fake-url.com'
      }
    );
  });

  it('clears inbox', (done) => {
    const apiKey = 'fake-api-key';
    const inbox = 'fake-inbox-id';
    const url = 'http://fake-url.com';

    const requestMock = fetchMock.sandbox().mock(
      `${url}/inboxes/${inbox}/clean?api_token=${apiKey}`,
      { data: 'cleared' },
      { method: 'PATCH' }
    );

    const mailtrapClient = create(requestMock, {
      config: {
        apiKey: apiKey,
        inboxId: inbox,
        url: url
      }
    });

    mailtrapClient.clearInbox().then((res) => {
      expect(res).toEqual({ data: 'cleared' });
      done();
    });
  });

  it('returns not read emails', (done) => {
    const apiKey = 'fake-api-key';
    const inbox = 'fake-inbox-id';
    const url = 'http://fake-url.com';

    const emails = [
      { subject: 's2', is_read: false },
      { subject: 's3', is_read: true },
      { subject: 's1', is_read: false }
    ];

    const requestMock = fetchMock.sandbox().mock(
      `${url}/inboxes/${inbox}/messages?api_token=${apiKey}`,
      emails,
      { method: 'GET' }
    );

    const mailtrapClient = create(requestMock, {
      config: {
        apiKey: apiKey,
        inboxId: inbox,
        url: url
      }
    });

    mailtrapClient.getEmails().then((res) => {
      expect(res.length).toEqual(2);
      res.forEach((email) => expect(email.is_read).toEqual(false));
      done();
    });
  });

  it('returns email attachments', (done) => {
    const apiKey = 'fake-api-key';
    const inbox = 'fake-inbox-id';
    const url = 'http://fake-url.com';
    const emailId = 'some-id';

    const requestMock = fetchMock.sandbox().mock(
      `${url}/inboxes/${inbox}/messages/${emailId}/attachments?api_token=${apiKey}`,
      [
        { id: 1, name: 'some-file', content: 'some-content' }
      ],
      {
        method: 'GET'
      }
    );

    const mailtrapClient = create(requestMock, {
      config: {
        apiKey: apiKey,
        inboxId: inbox,
        url: url
      }
    });

    mailtrapClient.getAttachments({ id: emailId }).then((res) => {
      expect(res).toEqual(
        [
          { id: 1, name: 'some-file', content: 'some-content' }
        ]
      );
      done();
    });
  });

  it('marks email as read', (done) => {
    const apiKey = 'fake-api-key';
    const inbox = 'fake-inbox-id';
    const url = 'http://fake-url.com';
    const emailId = 'some-id';

    const requestMock = fetchMock.sandbox().mock(
      (reqUrl, opts) => {
        return reqUrl === `${url}/inboxes/${inbox}/messages/${emailId}?api_token=${apiKey}`
          && opts.body === JSON.stringify({ message: { is_read: true } });
      },
      { data: 'marked-as-read' },
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const mailtrapClient = create(requestMock, {
      config: {
        apiKey: apiKey,
        inboxId: inbox,
        url: url
      }
    });

    mailtrapClient.markAsRead({ id: emailId }).then((res) => {
      expect(res).toEqual({ data: 'marked-as-read' });
      done();
    });
  });
});
