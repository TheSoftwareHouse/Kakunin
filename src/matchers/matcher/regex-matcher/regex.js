import { create } from '../../../helpers/modules-loader.helper';
import { regex } from './regexes/default';

const modulesLoader = create();
const availableRegexes = modulesLoader.getModules('regexes');

const regexes = availableRegexes.reduce((regexes, newRegexes) => ({ ...regexes, ...newRegexes }), { ...regex});

export default regexes;
