# Kakunin - automated testing framework
#### Migration to 2.2.0 version

What needs to be done:
1. If you are using MailTrap client to tests emails.
Open `kakunin.conf.js` file and edit it:
```javascript
  email: {
    type: 'mailtrap',
    config: {
      apiKey: '',
      inboxId: '',
      url: 'https://mailtrap.io/api/v1',
    },
  },
```

needs to be changed to:

```javascript
  email: {
    type: 'mailtrap',
    config: {
      apiKey: '',
      inboxId: '',
      url: 'https://mailtrap.io',
    },
  },
```

This change is required due to API changes in MailTrap.
More details available under the link: https://mailtrap.io/blog/2018-06-06-mailtraps-upcoming-api-changes

Please note that, that the steps in scenarios do not require any changes!
You can still use `html_body` to check the email content.

This is a breaking change for users using MailTrap in tests but we did not want to change version to "3.0.0".
Just "minor" version has been increased by one.

2. Remove node_modules
3. Update protractor to newest version - `npm install protractor@latest --save`
4. If you have some custom matchers, make sure to make them return rejected promise on fail. This is done to improve error readability.
