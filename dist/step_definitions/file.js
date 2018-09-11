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
    const storedData = _variableStore2.default.getVariableValue(variableName);
    const rows = file.filter((row, index) => row.length > 0 && index > 0);

    const findIndexes = () => {
      const allFoundIndexesInRows = [];

      storedData.forEach(storedItems => {
        const foundIndexesInRow = [];
        let previousFoundIndex = null;

        storedItems.forEach(storedValue => {
          for (const index in rows) {
            if (storedValue.match(/^\d+$/)) {
              if (previousFoundIndex !== null) {
                foundIndexesInRow.push(rows[previousFoundIndex].indexOf(parseInt(storedValue)));
                break;
              }

              if (rows[index].includes(parseInt(storedValue))) {
                previousFoundIndex = index;
                foundIndexesInRow.push(rows[index].indexOf(parseInt(storedValue)));
                break;
              }
            }

            if (previousFoundIndex !== null) {
              foundIndexesInRow.push(rows[previousFoundIndex].indexOf(storedValue));
              break;
            }

            if (rows[index].includes(storedValue)) {
              previousFoundIndex = index;
              foundIndexesInRow.push(rows[index].indexOf(storedValue));
              break;
            }
          }
        });

        allFoundIndexesInRows.push(foundIndexesInRow);
      });

      return Promise.resolve(allFoundIndexesInRows);
    };

    return findIndexes().then(allFoundIndexes => {
      if (allFoundIndexes[0].length !== storedData[0].length) {
        return Promise.reject('Values not found!');
      }

      if (allFoundIndexes.length === 1) {
        return Promise.resolve();
      }

      for (let index = 1; index < allFoundIndexes.length; index++) {
        if (JSON.stringify(allFoundIndexes[index]) !== JSON.stringify(allFoundIndexes[index - 1])) {
          return Promise.reject('Arrays are different!');
        }
      }
    });
  });
});