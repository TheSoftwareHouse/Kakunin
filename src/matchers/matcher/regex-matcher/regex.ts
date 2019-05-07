import { create } from '../../../core/modules-loader.helper';
import { regex } from './regexes/default';

const modulesLoader = create();
const availableRegexes = modulesLoader.getModules('regexes');

const regularExpressions = availableRegexes.reduce((regexes, newRegexes) => ({ ...regexes, ...newRegexes }), {
  ...regex,
});

export default regularExpressions;
