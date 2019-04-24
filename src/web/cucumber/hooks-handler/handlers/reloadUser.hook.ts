import { After } from 'cucumber';
import { HookHandler } from '../hook-handler.interface';

class ReloadUserHook implements HookHandler {
  public handleHook() {
    After('@reloadUsers', function(scenario, callback) {
      if (this.currentUser !== null) {
        this.userProvider.lockUser(this.currentUser.account, this.currentUser.type);
      }

      callback();
    });
  }

  public getPriority() {
    return 1;
  }
}

export const reloadUserHook = new ReloadUserHook();
