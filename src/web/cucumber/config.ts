import config from '../../core/config.helper';
import { defineSupportCode } from 'cucumber';

defineSupportCode(({ setDefaultTimeout }) => {
  setDefaultTimeout(Number(config.timeout) * 1000);
});
