// entry file
import * as dictionaries from './dictionaries';
import * as pages from './pages';

export { matchers, regexBuilder } from './matchers';
export { defineSupportCode, Given, When, Then, After, Before, AfterAll, BeforeAll } from 'cucumber';
export { dictionaries } from './dictionaries';
export { transformers } from './transformers';
export { generators } from './generators';
export { default as variableStore } from './core/variable-store.helper';
export { default as handlers } from './form-handlers/handlers';
export { comparators } from './comparators';
export { emailService } from './emails';
export { waitForVisibilityOf, waitForInvisibilityOf, waitForCondition } from './web/cucumber/wait-for-condition.helper';
export { hookHandlers } from './web/cucumber/hooks/hooks';

export const BasePage = pages.Form;
export const BaseDictionary = dictionaries.Base;
