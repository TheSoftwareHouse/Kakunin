class VariableStore {
  constructor() {
    this.variables = [];
  }

  storeVariable(name, value) {
    const foundVariable = this.variables.find(variable => variable.name === name);

    if (typeof foundVariable !== 'undefined') {
      throw new Error(`Variable ${name} is stored already`);
    }

    this.variables.push({ name: name, value: value });
  }

  updateVariable(name, value) {
    const foundVariable = this.variables.find(variable => variable.name === name);

    if (typeof foundVariable === 'undefined') {
      throw new Error(`Variable ${name} does not exist.`);
    }

    this.variables.push({ name: name, value: value });
  }

  getVariableValue(name) {
    const foundVariable = this.variables.find(variable => variable.name === name);

    if (typeof foundVariable === 'undefined') {
      throw new Error(`Variable ${name} was not stored`);
    }

    return foundVariable.value;
  }

  isStored(name) {
    const foundVariable = this.variables.find(variable => variable.name === name);

    return typeof foundVariable !== 'undefined';
  }

  clearVariables() {
    this.variables = [];
  }

  replaceTextVariables(text) {
    let newText = text;
    const variableNames = this.variables.map(variable => variable.name);

    for (let variableNameIndex in variableNames) {
      const variableName = variableNames[variableNameIndex];

      if (newText.indexOf(variableName) > -1) {
        newText = text.replace(`v:${variableName}`, this.getVariableValue(variableName));
        break;
      }
    }

    return newText;
  }
}

export default new VariableStore();
