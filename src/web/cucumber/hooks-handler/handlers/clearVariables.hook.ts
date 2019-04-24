import { Before } from 'cucumber';
import { HookHandler } from '../hook-handler.interface';
import userProvider from '../../../user-provider.helper';
import variableStore from '../../../variable-store.helper';

class ClearVariablesHook implements HookHandler {
  public handleHook() {
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
