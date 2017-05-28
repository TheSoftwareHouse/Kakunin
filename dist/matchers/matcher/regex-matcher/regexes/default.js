'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const regex = exports.regex = {
  arabianCharacters: '\u0621-\u064A',
  arabianNumbers: '\u0660-\u0669',
  standardCharacters: 'a-zA-Z',
  standardNumbers: '0-9',
  notEmpty: '.+',
  number: '[0-9]+',
  pdfFile: '[\\w]+.pdf',
  pdfFileType: 'application/pdf',
  email: "[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
};