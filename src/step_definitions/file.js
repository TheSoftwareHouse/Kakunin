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
