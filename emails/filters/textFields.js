const regexBuilder = require('../../matchers/matchers/regexMatcher/regexBuilder');
const variableStore = require('../../helpers/variableStore');

class TextFieldFilter {
  isSatisfiedBy(type) {
    return ['subject', 'from_email', 'from_name', 'to_email', 'to_name', 'html_body', 'text_body'].indexOf(type) !== -1;
  }

  filter(emails, type, value, world) {
    return emails.filter((email) => {
      if (value.startsWith('r:')) {
        return regexBuilder.buildRegex(value).test(email[type]);
      }

      if (value.startsWith('t:')) {
        return new RegExp(RegExp.escape(variableStore.replaceTextVariables(value.substr(2)))).test(email[type]);
      }

      throw 'Comparison type not specified. Please use r: for regex and t: for text';
    })
  }
}

module.exports = new TextFieldFilter();
