// entry file
import * as dictionaries from './common/dictionaries';
import * as pages from './web/pages';

export { matchers, regexBuilder } from './common/matchers';
export { defineSupportCode, Given, When, Then, After, Before, AfterAll, BeforeAll } from 'cucumber';
export { dictionaries } from './common/dictionaries';
export { transformers } from './common/transformers';
export { generators } from './common/generators';
export { default as variableStore } from './core/variable-store.helper';
export { default as handlers } from './web/form-handlers/handlers';
export { comparators } from './common/comparators';
export { emailService } from './common/emails';
export { waitForVisibilityOf, waitForInvisibilityOf, waitForCondition } from './web/methods/wait-for-condition.methods';
export { hookHandlers } from './web/cucumber/hooks/hooks';
export { methods } from './web/methods';

export const BasePage = pages.Form;
export const BaseDictionary = dictionaries.Base;
