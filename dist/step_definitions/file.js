'use strict';

var _cucumber = require('cucumber');

var _fileManager = require('../helpers/file-manager.helper');

var _fileManager2 = _interopRequireDefault(_fileManager);

var _variableStore = require('../helpers/variable-store.helper');

var _variableStore2 = _interopRequireDefault(_variableStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cucumber.defineSupportCode)(function ({ Then }) {
  Then(/^the file "([^"]*)" should be downloaded$/, function (filename) {
    return _fileManager2.default.wasDownloaded(_variableStore2.default.replaceTextVariables(filename));
  });

  Then(/^the file "([^"]*)" contains table data stored under "([^"]*)" variable$/, function (filename, variableName) {
    const file = _fileManager2.default.parseXLS(_variableStore2.default.replaceTextVariables(filename));
    let availableData = _variableStore2.default.getVariableValue(variableName);

    const rows = file.filter(function (row, index) {
      return row.length > 0 && index > 0;
    });

    const missingRows = rows.reduce((previous, current) => {
      const expectedRowIndex = availableData.findIndex(item => {
        let hasAllProperties = true;

        for (let i = 0; i < current.length; i++) {
          if (current[i] !== item[i]) {
            hasAllProperties = false;
            break;
          }
        }

        return hasAllProperties;
      });

      if (expectedRowIndex === -1) {
        previous.push(current);
        return previous;
      }

      availableData = availableData.filter((item, index) => index !== expectedRowIndex);

      return previous;
    }, []);

    if (missingRows.length === 0) {
      return Promise.resolve();
    }

    return Promise.reject('Some rows not found: ' + missingRows.map(row => row[0]).join(', '));
  });
});