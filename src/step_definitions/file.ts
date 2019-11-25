import { Then } from 'cucumber';
import fileManager from '../web/fs/file-manager.helper';
import variableStore from '../core/variable-store.helper';

Then(/^the file "([^"]*)" should be downloaded$/, filename => {
  return fileManager.wasDownloaded(variableStore.replaceTextVariables(filename));
});

Then(/^the file "([^"]*)" contains table data stored under "([^"]*)" variable$/, (filename, variableName) => {
  const file = fileManager.parseXLS(variableStore.replaceTextVariables(filename));
  const storedData = variableStore.getVariableValue(variableName);
  const rows = file.filter((row, index) => row.length > 0 && index > 0);

  const findIndexes = () => {
    const allFoundIndexesInRows = [];

    storedData.forEach(storedItems => {
      const foundIndexesInRow = [];
      let previousFoundIndex = null;

      storedItems.forEach(storedValue => {
        for (const index in rows) {
          if (rows.hasOwnProperty(index)) {
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
