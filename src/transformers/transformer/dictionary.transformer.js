import { dictionaries as dicts } from '../../dictionaries';

class DictionaryTransformer {
  constructor(dictionaries) {
    this.dictionaries = dictionaries;
  }

  isSatisfiedBy(prefix) {
    return prefix === 'd:';
  }

  transform(value) {
    const splittedValue = value.split(':');
    return this.dictionaries.getMappedValue(splittedValue[0], splittedValue[1]);
  }
}
export const createDictionaryTransformer = (dictionaries = dicts) => new DictionaryTransformer(dictionaries);
