export class VariableStore {
  constructor(public variables: any[] = []) {}

  public storeVariable(name: string, value: any): void {
    const foundVariable = this.variables.find(variable => variable.name === name);

    if (typeof foundVariable !== 'undefined') {
      throw new Error(`Variable ${name} is stored already`);
    }

    this.variables.push({ name, value });
  }

  public updateVariable(name: string, value: any): void {
    const foundVariable = this.variables.find(variable => variable.name === name);

    if (typeof foundVariable === 'undefined') {
      throw new Error(`Variable ${name} does not exist.`);
    }

    this.variables.push({ name, value });
  }

  public getVariableValue(name: string): any {
    const foundVariable = this.variables.find(variable => variable.name === name);

    if (typeof foundVariable === 'undefined') {
      throw new Error(`Variable ${name} was not stored`);
    }

    return foundVariable.value;
  }

  public isStored(name: string): boolean {
    const foundVariable = this.variables.find(variable => variable.name === name);

    return typeof foundVariable !== 'undefined';
  }

  public clearVariables(): void {
    this.variables = [];
  }

  public replaceTextVariables(text: string): any {
    let newText = text;
    const variableNames = this.variables.map(variable => variable.name);

    for (const variableNameIndex in variableNames) {
      if (variableNames.hasOwnProperty(variableNameIndex)) {
        const variableName = variableNames[variableNameIndex];

        if (newText.indexOf(variableName) > -1) {
          newText = text.replace(`v:${variableName}`, this.getVariableValue(variableName));
          break;
        }
      }
    }

    return newText;
  }
}

export default new VariableStore();
