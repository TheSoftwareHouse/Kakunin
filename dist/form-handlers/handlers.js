'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handler = require('./handler');

var formHandler = _interopRequireWildcard(_handler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const availableHandlers = [formHandler.checkboxHandler, formHandler.ckEditorHandler, formHandler.customAngularSelectHandler, formHandler.defaultHandler, formHandler.fileHandler, formHandler.radioHandler, formHandler.selectHandler, formHandler.uploadedFileHandler];

const FormHandler = {
  addHandler: function (handler) {
    availableHandlers.push(handler);
  },

  handleFill: (() => {
    var _ref = _asyncToGenerator(function* (page, elementName, desiredValue) {
      const handlers = this.getHandlers();

      for (let handler of handlers) {
        const isSatisfied = yield handler.isSatisfiedBy(page[elementName], elementName);

        if (isSatisfied) {
          return handler.handleFill(page, elementName, desiredValue);
        }
      }

      return Promise.reject('Could not find matching handler.');
    });

    return function handleFill(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })(),

  handleCheck: (() => {
    var _ref2 = _asyncToGenerator(function* (page, elementName, desiredValue) {
      const handlers = this.getHandlers();

      for (let handler of handlers) {
        const isSatisfied = yield handler.isSatisfiedBy(page[elementName], elementName);

        if (isSatisfied) {
          return handler.handleCheck(page, elementName, desiredValue);
        }
      }

      return Promise.reject('Could not find matching handler.');
    });

    return function handleCheck(_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  })(),

  getHandlers: function () {
    return availableHandlers.sort((handler, otherHandler) => handler.getPriority() - otherHandler.getPriority());
  }
};

exports.default = FormHandler;