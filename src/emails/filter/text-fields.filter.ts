import { regexBuilder } from '../../matchers';
import variableStore from '../../core/variable-store.helper';

class TextFieldFilter {
  public isSatisfiedBy(type) {
    return ['subject', 'from_email', 'from_name', 'to_email', 'to_name', 'html_body', 'text_body'].indexOf(type) !== -1;
  }

  public filter(emails, type, value) {
    return emails.filter(email => {
      if (value.startsWith('r:')) {
        return regexBuilder.buildRegex(value).test(email[type]);
      }

      if (value.startsWith('t:')) {
        return new RegExp(RegExp.escape(variableStore.replaceTextVariables(value.substr(2)))).test(email[type]);
      }

      throw new Error('Comparison type not specified. Please use r: for regex and t: for text');
    });
  }
}

export const textFieldFilter = new TextFieldFilter();
