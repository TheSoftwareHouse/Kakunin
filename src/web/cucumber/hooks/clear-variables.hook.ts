import { Before } from 'cucumber';
import { HookHandler } from './hook.interface';
import userProvider from '../../user-provider.helper';
import variableStore from '../../../core/variable-store.helper';

class ClearVariablesHook implements HookHandler {
  public initializeHook() {
    Before(function(scenario, callback) {
      this.currentUser = null;

      if (typeof this.userProvider === 'undefined') {
        this.userProvider = userProvider;
      }

      variableStore.clearVariables();

      callback();
    });
  }

  public getPriority() {
    return 1;
  }
}

export const clearVariablesHook = new ClearVariablesHook();
