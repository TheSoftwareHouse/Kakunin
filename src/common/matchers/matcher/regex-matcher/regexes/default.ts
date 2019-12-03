export const regex = {
  arabianCharacters: '\u0621-\u064A',
  arabianNumbers: '\u0660-\u0669',
  standardCharacters: 'a-zA-Z',
  standardNumbers: '0-9',
  notEmpty: '.+',
  number: '[0-9]+',
  pdfFile: '[\\w]+.pdf',
  pdfFileType: 'application/pdf',
  email:
    "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
  // todo: following regex should be moved to tests/regexes
  someRandomLinkRegex: '(http(s)?://some-random-link.com)',
};
