import { dictionaries as dicts } from '../../dictionaries';

class DictionaryTransformer {
  private dictionaries: any;

  constructor(dictionaries) {
    this.dictionaries = dictionaries;
  }

  public isSatisfiedBy(prefix) {
    return prefix === 'd:';
  }

  public transform(value) {
    const splittedValue = value.split(':');
    return this.dictionaries.getMappedValue(splittedValue[0], splittedValue[1]);
  }
}
export const createDictionaryTransformer = (dictionaries = dicts) => new DictionaryTransformer(dictionaries);
