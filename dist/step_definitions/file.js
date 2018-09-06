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

    const findIndexes = () => {
      const allFoundIndexesInTable = [];

      for (const index in rows) {
        const foundValueIndexesInRow = [];

        availableData.forEach((item, i) => {
          if (i < item.length) {
            if (availableData[index][i].match(/^\d+$/)) {
              return foundValueIndexesInRow.push(rows[index].indexOf(parseInt(availableData[index][i])));
            }

            return foundValueIndexesInRow.push(rows[index].indexOf(availableData[index][i]));
          }
        });

        if (foundValueIndexesInRow.includes(-1)) {
          break;
        }

        allFoundIndexesInTable.push(foundValueIndexesInRow);
      }

      return Promise.resolve(allFoundIndexesInTable);
    };

    return findIndexes().then(allFoundIndexesInTable => {
      if (allFoundIndexesInTable[0].length !== availableData[0].length) {
        return Promise.reject('Values not found!');
      }

      if (allFoundIndexesInTable.length === 1) {
        return Promise.resolve();
      }

      for (let index = 1; index < allFoundIndexesInTable.length; index++) {
        if (JSON.stringify(allFoundIndexesInTable[index]) !== JSON.stringify(allFoundIndexesInTable[index - 1])) {
          return Promise.reject('Arrays are different!');
        }
      }

      return Promise.resolve();
    });
  });
});