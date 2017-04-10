const fs = require('fs');

const pascalConfig = require('../helpers/pascalConfig');
const modulesLoader = require('../helpers/modulesLoader');

const availableDictionaries = modulesLoader.getModules(pascalConfig.dictionaries, [__dirname + '/dictionaries']);

const Dictionaries = {
  getMappedValue: function(dictionaryName, key) {
    const dic = this.findDictionary(dictionaryName);

    if (dic === undefined) {
      throw new Error(`Could not find dictionary for ${dictionaryName}.`);
    }

    return dic.getMappedValue(key);
  },

  findDictionary: function (name) {
    return availableDictionaries.find((dic) => dic.isSatisfiedBy(name));
  }
};

module.exports = Dictionaries;
