'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FixturesLoader = {
  reloadFixtures: function (endpoint) {
    return (0, _nodeFetch2.default)(endpoint);
  }
};

exports.default = FixturesLoader;