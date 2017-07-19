// entry file
import * as pages from './pages';

export { matchers, regexBuilder } from './matchers';
export { defineSupportCode } from 'cucumber';
export { dictionaries } from './dictionaries';
export { transformers } from './transformers';
export { generators } from './generators';
export { default as variableStore } from './helpers/variable-store.helper';
export { default as handlers } from './form-handlers/handlers';
export { comparators } from './comparators';
export { emailService } from './emails';

export const FormPage = pages.Form;
export const BasePage = pages.Base;
