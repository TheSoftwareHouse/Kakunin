import * as hookHandler from './handlers';
import { HookHandler } from './hook-handler.interface';

class HookHandlers {
  constructor(
    private availableHandlers: HookHandler[] = [
      hookHandler.takeScreenshotHook,
      hookHandler.reloadFixturesHook,
      hookHandler.clearDownloadHook,
      hookHandler.reloadUserHook,
      hookHandler.clearVariablesHook,
    ]
  ) {}

  public addHandler(handler: HookHandler): void {
    this.availableHandlers.push(handler);
  }

  public handleHook(): string | void {
    const handlers = this.getHandlers();

    for (const handler of handlers) {
      handler.handleHook();
    }
  }

  public getHandlers(): HookHandler[] {
    return this.availableHandlers.sort((handler, otherHandler) => handler.getPriority() - otherHandler.getPriority());
  }
}

export default new HookHandlers();
