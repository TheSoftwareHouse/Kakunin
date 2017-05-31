'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textFieldFilter = undefined;

var _matchers = require('../../matchers');

var _variableStore = require('../../helpers/variable-store.helper');

var _variableStore2 = _interopRequireDefault(_variableStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextFieldFilter {
  isSatisfiedBy(type) {
    return ['subject', 'from_email', 'from_name', 'to_email', 'to_name', 'html_body', 'text_body'].indexOf(type) !== -1;
  }

  filter(emails, type, value, world) {
    return emails.filter(email => {
      if (value.startsWith('r:')) {
        return _matchers.regexBuilder.buildRegex(value).test(email[type]);
      }

      if (value.startsWith('t:')) {
        return new RegExp(RegExp.escape(_variableStore2.default.replaceTextVariables(value.substr(2)))).test(email[type]);
      }

      throw 'Comparison type not specified. Please use r: for regex and t: for text';
    });
  }
}

const textFieldFilter = exports.textFieldFilter = new TextFieldFilter();