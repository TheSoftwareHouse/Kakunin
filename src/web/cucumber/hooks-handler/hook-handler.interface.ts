export interface HookHandler {
  handleHook(): string | void;
  getPriority(): number;
}
