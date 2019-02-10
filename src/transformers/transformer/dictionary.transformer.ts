import { dictionaries as dicts, Dictionaries } from '../../dictionaries';

class DictionaryTransformer implements ValueTransformer {
  constructor(private dictionaries: Dictionaries) {}

  public isSatisfiedBy(prefix) {
    return prefix === 'd:';
  }

  public transform(value) {
    const splittedValue = value.split(':');
    return this.dictionaries.getMappedValue(splittedValue[0], splittedValue[1]);
  }
}
export const createDictionaryTransformer = (dictionaries = dicts) => new DictionaryTransformer(dictionaries);
