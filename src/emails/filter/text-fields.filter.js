import { regexBuilder } from '../../matchers';
import variableStore from '../../web/variable-store.helper';

class TextFieldFilter {
  isSatisfiedBy(type) {
    return ['subject', 'from_email', 'from_name', 'to_email', 'to_name', 'html_body', 'text_body'].indexOf(type) !== -1;
  }

  // eslint-disable-next-line no-unused-vars
  filter(emails, type, value, world) {
    return emails.filter(email => {
      if (value.startsWith('r:')) {
        return regexBuilder.buildRegex(value).test(email[type]);
      }

      if (value.startsWith('t:')) {
        return new RegExp(RegExp.escape(variableStore.replaceTextVariables(value.substr(2)))).test(email[type]);
      }

      throw 'Comparison type not specified. Please use r: for regex and t: for text';
    });
  }
}

export const textFieldFilter = new TextFieldFilter();
