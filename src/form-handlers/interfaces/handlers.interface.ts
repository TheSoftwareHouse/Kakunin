interface HandlersInterface {
  addHandler(handler: HandlerInterface): void;
  handleFill(page: object, elementName: string, desiredValue: string): Promise<string | void>;
  handleCheck(page: object, elementName: string, desiredValue: string): Promise<string | void>;
  getHandlers(): HandlerInterface[];
}
