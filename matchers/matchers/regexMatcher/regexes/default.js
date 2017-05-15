const regex = {
  arabianCharacters: '\u0621-\u064A',
  arabianNumbers: '\u0660-\u0669',
  space: ' ',
  punctuation: '\.\,',
  standardCharacters: 'a-zA-Z',
  standardNumbers: '0-9',
  standardDate: '[0-9]{2}\/[0-9]{2}\/[0-9]{4}',
  StandardDateFormat: '.*([0-9]{2}[\-\/][0-9]{2}[\-\/][0-9]{4}).*',
  standardDateMatchingYear: '[0-9]{2}\/[0-9]{2}\/([0-9]{4})',
  standardDatePeriod: '[0-9]{2}\/[0-9]{2}\/[0-9]{4} \- [0-9]{2}\/[0-9]{2}\/[0-9]{4}',
  dotDate: '[0-9]{2}.[0-9]{2}.[0-9]{4}',
  notEmpty: '.+',
  number: '[0-9]+',
  pdfFile: '[\\w]+.pdf',
  pdfFileType: 'application/pdf'
};

module.exports = regex;
