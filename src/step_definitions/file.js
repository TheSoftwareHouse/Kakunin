import { defineSupportCode } from 'cucumber';
import fileManager from '../helpers/file-manager.helper';
import variableStore from '../helpers/variable-store.helper';

defineSupportCode(function ({ Then }) {
  Then(/^the file "([^"]*)" should be downloaded$/, function (filename) {
    return fileManager.wasDownloaded(variableStore.replaceTextVariables(filename));
  });

  Then(/^the file "([^"]*)" contains table data stored under "([^"]*)" variable$/, function (filename, variableName) {
    const file = fileManager.parseXLS(variableStore.replaceTextVariables(filename));
    const availableData = variableStore.getVariableValue(variableName);
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
