import config from '../../core/config.helper';
import { setDefaultTimeout } from 'cucumber';

setDefaultTimeout(Number(config.timeout) * 1000);
