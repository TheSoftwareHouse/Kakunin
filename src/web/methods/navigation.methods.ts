export const switchWindow = (tabNumber: number) => {
  return browser.getAllWindowHandles().then((handles) => browser.switchTo().window(handles[tabNumber - 1]));
};

export const closeCurrentWindow = () => {
  return browser
    .close()
    .then(() => browser.getAllWindowHandles())
    .then((tabs) => browser.switchTo().window(tabs[0]));
};
