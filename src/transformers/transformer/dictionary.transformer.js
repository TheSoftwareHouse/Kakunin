import { dictionaries } from '../../dictionaries';

class DictionaryTransformer {
  constructor(dictionaries) {
    this.dictionaries = dictionaries;
  }

  isSatisfiedBy(prefix) {
    return 'd:' === prefix;
  }

  transform(value) {
    const splittedValue = value.split(':');
    return this.dictionaries.getMappedValue(splittedValue[0], splittedValue[1]);
  }
}
export const createDictionaryTransformer = (dicts = dictionaries) => new DictionaryTransformer(dicts);
