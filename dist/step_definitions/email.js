'use strict';

var _cucumber = require('cucumber');

var _sugarDate = require('sugar-date');

var _sugarDate2 = _interopRequireDefault(_sugarDate);

var _filters = require('../emails/filters');

var _matchers = require('../matchers');

var _email = require('../emails/email.service');

var _config = require('../helpers/config.helper');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emailService = (0, _email.create)();

(0, _cucumber.defineSupportCode)(function ({ Then }) {
  function stopInterval(interval, callback) {
    clearInterval(interval);
    callback();
  }

  function checkAttachmentsInEmail(email, filesExtensions, attachments) {
    let fileAttachments = attachments.filter(attachment => attachment.attachment_type === 'attachment');

    const missingFiles = filesExtensions.reduce((previous, current) => {
      const expectedFile = fileAttachments.find(attachment => {
        return _matchers.regexBuilder.buildRegex(current.name).test(attachment.filename) && _matchers.regexBuilder.buildRegex(current.type).test(attachment.content_type) && attachment.attachment_size >= current.minimalSize;
      });

      if (typeof expectedFile === 'undefined') {
        previous.push(current);
        return previous;
      }

      fileAttachments = fileAttachments.filter(attachment => attachment.id !== expectedFile.id);

      return previous;
    }, []);

    if (missingFiles.length === 0) {
      return emailService.markAsRead(email);
    }

    return Promise.reject('Some attachments not found: ' + missingFiles.map(file => file.name).join(', '));
  }

  function filterEmails(emails, data) {
    const checks = data.raw().filter(elem => elem[0] !== 'file');

    for (let i = 0; i < checks.length; i++) {
      const checkType = checks[i][0];
      const checkValue = checks[i][1];

      emails = _filters.filters.filter(emails, checkType, checkValue, this);
    }

    return emails;
  }

  function getFilesExtensions(data) {
    return data.raw().filter(elem => elem[0] === 'file').map(elem => {
      return { name: elem[1], type: elem[2], minimalSize: elem[3] };
    });
  }

  function rejectIfMaxRepeatsReached(filteredEmails, maxRepeats) {
    if (filteredEmails.length === 0 && maxRepeats === 0) {
      return Promise.reject('No emails found and maximum repeats reached');
    }

    return filteredEmails;
  }

  function rejectIfMoreThanOneEmailFound(filteredEmails) {
    if (filteredEmails.length > 1) {
      return Promise.reject('More than one email found');
    }

    return filteredEmails;
  }

  function validateEmailDate(filteredEmails) {
    if (filteredEmails.length === 1) {
      if (_sugarDate2.default.Date.minutesFromNow(_sugarDate2.default.Date.create(filteredEmails[0].created_at)) < -10) {
        return Promise.reject('Email was sent more than 10 minutes ago. This is probably not what you are looking for.');
      }
    }

    return filteredEmails;
  }

  function validateEmailContentAndAttachments(filteredEmails, data, interval, sync) {
    if (filteredEmails.length === 1) {
      const filesExtensions = getFilesExtensions(data);

      if (filesExtensions.length > 0) {
        return emailService.getAttachments(filteredEmails[0]).then(checkAttachmentsInEmail.bind(null, filteredEmails[0], filesExtensions)).then(stopInterval.bind(null, interval, sync));
      }
      return emailService.markAsRead(filteredEmails[0]).then(stopInterval.bind(null, interval, sync));
    }
  }

  Then(/^the email has been sent and contains:$/, function (data, sync) {
    const self = this;
    const timeout = parseInt(_config2.default.intervalEmail);
    let maxRepeats = 4;

    const interval = setInterval(() => {
      console.log('Checking mailbox for email...');

      emailService.getEmails().then(emails => filterEmails.call(self, emails, data)).then(filteredEmails => rejectIfMaxRepeatsReached(filteredEmails, maxRepeats)).then(filteredEmails => rejectIfMoreThanOneEmailFound(filteredEmails)).then(filteredEmails => validateEmailDate(filteredEmails)).then(filteredEmails => validateEmailContentAndAttachments(filteredEmails, data, interval, sync)).then(() => maxRepeats--).catch(err => stopInterval(interval, sync.bind(null, err)));
    }, timeout);
  });
});