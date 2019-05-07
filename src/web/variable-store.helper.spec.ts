import VariableStore from './variable-store.helper';

describe('Variable store', () => {
  it('returns empty list of stored variables after clear', () => {
    VariableStore.variables = [
      {
        name: 'newStoredVariable',
        value: 'example-variable-content',
      },
      {
        name: 'newStoredVariableTwo',
        value: 'example-variable-content-two',
      },
    ];

    VariableStore.clearVariables();
    expect(VariableStore.variables).toEqual([]);
  });

  it('returns array which contains newly stored variable', () => {
    VariableStore.variables = [];
    VariableStore.storeVariable('newStoredVariable', 'example-variable-content');

    expect(VariableStore.variables).toEqual(
      expect.arrayContaining([
        {
          name: 'newStoredVariable',
          value: 'example-variable-content',
        },
      ])
    );
  });

  it('throws error that the variable already exists', () => {
    VariableStore.variables = [
      {
        name: 'newStoredVariable',
        value: 'example-variable-content',
      },
    ];

    expect(() => {
      VariableStore.storeVariable('newStoredVariable', 'example-variable-content');
    }).toThrow('Variable newStoredVariable is stored already');
  });

  it('returns updated array of stored variables', () => {
    VariableStore.variables = [
      {
        name: 'newStoredVariable',
        value: 'example-variable-content',
      },
    ];

    VariableStore.updateVariable('newStoredVariable', 'updated variable');
    expect(VariableStore.variables).toEqual(
      expect.arrayContaining([
        {
          name: 'newStoredVariable',
          value: 'updated variable',
        },
      ])
    );
  });

  it('throws error that the variable cannot be updated because does not exist', () => {
    VariableStore.variables = [];

    expect(() => {
      VariableStore.updateVariable('newStoredVariable', 'updated variable');
    }).toThrow('Variable newStoredVariable does not exist');
  });

  it('returns value from the stored variable', () => {
    VariableStore.variables = [
      {
        name: 'newStoredVariable',
        value: 'example-variable-content',
      },
    ];

    expect(VariableStore.getVariableValue('newStoredVariable')).toEqual('example-variable-content');
  });

  it('throws error that the value cannot be displayed because does not exist', () => {
    VariableStore.variables = [
      {
        name: 'newStoredVariable',
        value: 'example-variable-content',
      },
    ];

    expect(() => {
      VariableStore.getVariableValue('unavailableVariable');
    }).toThrow('Variable unavailableVariable was not stored');
  });

  it('returns false when variable was not stored', () => {
    VariableStore.variables = [];

    expect(VariableStore.isStored('newStoredVariable')).toEqual(false);
  });

  it('returns true when variable was stored', () => {
    VariableStore.variables = [
      {
        name: 'newStoredVariable',
        value: 'example-variable-content',
      },
    ];

    expect(VariableStore.isStored('newStoredVariable')).toEqual(true);
  });

  it('returns value with replaced variable with text matcher prefix', () => {
    VariableStore.variables = [
      {
        name: 'newStoredVariable',
        value: 'example-variable-content',
      },
    ];

    expect(VariableStore.replaceTextVariables('t:v:newStoredVariable')).toEqual('t:example-variable-content');
  });

  it('returns value with replaced variable with only variableStore prefix', () => {
    VariableStore.variables = [
      {
        name: 'newStoredVariable',
        value: 'example-variable-content',
      },
    ];

    expect(VariableStore.replaceTextVariables('v:newStoredVariable')).toEqual('example-variable-content');
  });

  it('returns the same value if there is no variable prefix - text matcher', () => {
    VariableStore.variables = [];

    expect(VariableStore.replaceTextVariables('t:some random text')).toEqual('t:some random text');
  });

  it('returns the same value if there is no variable prefix - regex matcher', () => {
    VariableStore.variables = [];

    expect(VariableStore.replaceTextVariables('r:notEmpty')).toEqual('r:notEmpty');
  });

  it('returns full text if there is no stored variable', () => {
    VariableStore.variables = [];

    expect(VariableStore.replaceTextVariables('t:v:unavailableVariable')).toEqual('t:v:unavailableVariable');
  });
});
