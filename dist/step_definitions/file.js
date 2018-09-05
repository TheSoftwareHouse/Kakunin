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
    const availableData = _variableStore2.default.getVariableValue(variableName);
    const rows = file.filter((row, index) => row.length > 0 && index > 0);

    if (rows.length !== availableData.length) {
      return Promise.reject('Number of rows is not equal!');
    }

    const findIndexes = () => {
      const results = [];

      for (const index in rows) {
        const listOfIndexes = [];

        availableData.filter((item, i) => {
          if (i < item.length) {
            if (availableData[index][i].match(/^\d+$/)) {
              return listOfIndexes.push(rows[index].indexOf(parseInt(availableData[index][i])));
            }

            return listOfIndexes.push(rows[index].indexOf(availableData[index][i]));
          }
        });

        if (listOfIndexes.includes(-1)) {
          break;
        }

        results.push(listOfIndexes);
      }

      return Promise.resolve(results);
    };

    return findIndexes().then(results => {
      if (results.length !== rows.length) {
        return Promise.reject('Values not found!');
      }

      return results.reduce((accelerator, current) => {
        current.forEach((item, index) => {
          if (!accelerator[index] === item) {
            return Promise.reject('Arrays are different!');
          }
        });

        return current;
      }, results[0]);
    });
  });
});