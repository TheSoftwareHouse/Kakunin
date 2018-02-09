'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _formHandlers = require('../form-handlers');

var _transformers = require('../transformers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class FormPage extends _base2.default {
  fillForm(formData) {
    var _this = this;

    return _asyncToGenerator(function* () {
      for (let item of formData) {
        yield _this.fillField(item[0], item[1]);
      }

      return Promise.resolve();
    })();
  }

  checkForm(formData) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      for (let item of formData) {
        yield _this2.checkField(item[0], item[1]);
      }

      return Promise.resolve();
    })();
  }

  fillField(name, value) {
    return _formHandlers.fromHandlers.handleFill(this, name, _transformers.transformers.transform(value));
  }

  checkField(name, value) {
    return _formHandlers.fromHandlers.handleCheck(this, name, _transformers.transformers.transform(value));
  }
}

exports.default = FormPage;