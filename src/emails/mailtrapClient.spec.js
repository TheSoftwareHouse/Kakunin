const fetchMock = require('fetch-mock');

const chai = require('chai');
const expect = chai.expect;

describe('Mailtrap client', () => {
  it('throws as error when env is missing required configuration', () => {
    const mailtrapClient = require('./mailtrapClient').create();

    delete process.env.MAILTRAP_API_KEY;
    delete process.env.MAILTRAP_INBOX_ID;
    delete process.env.MAILTRAP_URL;

    expect(() => mailtrapClient.getMailtrapConfig())
      .to.throw('Missing mailtrap api key. Use export MAILTRAP_API_KEY=your-api-key for setup.');

    process.env.MAILTRAP_API_KEY = 'fake-api-key';

    expect(() => mailtrapClient.getMailtrapConfig())
      .to.throw('Missing mailtrap inbox id. Use export MAILTRAP_INBOX_ID=your-inbox-id for setup.');

    process.env.MAILTRAP_INBOX_ID = 'fake-inbox-id';

    expect(() => mailtrapClient.getMailtrapConfig())
      .to.throw('Missing mailtrap endpoint url. Use export MAILTRAP_URL=your-endpoint-url for setup.');
  });

  it('it returns mailtrap config', () => {
    const mailtrapClient = require('./mailtrapClient').create();

    process.env.MAILTRAP_API_KEY = 'fake-api-key';
    process.env.MAILTRAP_INBOX_ID = 'fake-inbox-id';
    process.env.MAILTRAP_URL = 'http://fake-url.com';

    expect(mailtrapClient.getMailtrapConfig())
      .to.eql({
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

    const mailtrapClient = require('./mailtrapClient').create(requestMock);

    process.env.MAILTRAP_API_KEY = apiKey;
    process.env.MAILTRAP_INBOX_ID = inbox;
    process.env.MAILTRAP_URL = url;

    mailtrapClient.clearInbox().then((res) => {
      expect(res).to.eql({ data: 'cleared' });
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

    const mailtrapClient = require('./mailtrapClient').create(requestMock);

    process.env.MAILTRAP_API_KEY = apiKey;
    process.env.MAILTRAP_INBOX_ID = inbox;
    process.env.MAILTRAP_URL = url;

    mailtrapClient.getEmails().then((res) => {
      expect(res.length).to.equals(2);
      res.forEach((email) => expect(email.is_read).to.equals(false));
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

    const mailtrapClient = require('./mailtrapClient').create(requestMock);

    process.env.MAILTRAP_API_KEY = apiKey;
    process.env.MAILTRAP_INBOX_ID = inbox;
    process.env.MAILTRAP_URL = url;

    mailtrapClient.getAttachments({ id: emailId }).then((res) => {
      expect(res).to.eql(
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

    const mailtrapClient = require('./mailtrapClient').create(requestMock);

    process.env.MAILTRAP_API_KEY = apiKey;
    process.env.MAILTRAP_INBOX_ID = inbox;
    process.env.MAILTRAP_URL = url;

    mailtrapClient.markAsRead({ id: emailId }).then((res) => {
      expect(res).to.eql({ data: 'marked-as-read' });
      done();
    });
  });
});
