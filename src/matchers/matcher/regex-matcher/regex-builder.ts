import regex from './regex';

class RegexBuilder {
  public buildRegex(regexTemplate: string): RegExp {
    for (const property in regex) {
      if (regex.hasOwnProperty(property) && regexTemplate === 'r:' + property) {
        return new RegExp(regex[property]);
      }
    }

    throw new Error('Regex with template ' + regexTemplate + ' was not found');
  }
}

export const regexBuilder = new RegexBuilder();
