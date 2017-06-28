import regex from './regex';

class RegexBuilder {
  buildRegex(regexTemplate) {
    for (let property in regex) {
      if (regex.hasOwnProperty(property)) {
        if (regexTemplate === 'r:' + property) {
          return new RegExp(regex[property]);
        }
      }
    }

    throw 'Regex with template ' + regexTemplate + ' was not found';
  }
}

export const regexBuilder = new RegexBuilder();
