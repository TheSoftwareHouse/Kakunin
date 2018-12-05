// entry file
import * as pages from './pages';
import * as dictionaries from './dictionaries';

export { matchers, regexBuilder } from './matchers';
export { defineSupportCode } from 'cucumber';
export { dictionaries } from './dictionaries';
export { transformers } from './transformers';
export { generators } from './generators';
export { default as variableStore } from './web/variable-store.helper';
export { default as handlers } from './form-handlers/handlers';
export { comparators } from './comparators';
export { emailService } from './emails';
export { waitForVisibilityOf, waitForInvisibilityOf, waitForCondition } from './web/cucumber/wait-for-condition.helper';

export const BasePage = pages.Form;
export const BaseDictionary = dictionaries.Base;
