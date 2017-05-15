const fileManager = require('../helpers/fileManager');
const variableStore = require('../helpers/variableStore');

module.exports = function () {
  this.Then('the file "$filename" should be downloaded', function (filename) {
    return fileManager.wasDownloaded(variableStore.replaceTextVariables(filename));
  });

  this.Then('the file "$filename" contains table data stored under "$variableName" variable', function (filename, variableName) {
    const file = fileManager.parseXLS(variableStore.replaceTextVariables(filename));
    let availableData = variableStore.getVariableValue(variableName);

    const rows = file.filter(function (row, index) {
      return row.length > 0 && index > 0;
    });

    const missingRows = rows.reduce((previous, current) => {
      const expectedRowIndex = availableData.findIndex((item) => {
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

    return Promise.reject('Some rows not found: ' + missingRows.map((row) => row[0]).join(', '));
  });
};
