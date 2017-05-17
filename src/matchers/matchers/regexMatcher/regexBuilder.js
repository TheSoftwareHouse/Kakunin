const regex = require('./regex');

const RegexBuilder = {
  buildRegex: function (regexTemplate) {
    for (let property in regex) {
      if (regex.hasOwnProperty(property)) {
        if (regexTemplate === 'r:' + property) {
          return new RegExp(regex[property]);
        }
      }
    }

    throw 'Regex with template ' + regexTemplate + ' was not found';
  }
};

module.exports = RegexBuilder;
