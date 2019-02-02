import config from '../core/config.helper';
import { waitForInvisibilityOf, waitForVisibilityOf } from '../web/cucumber/wait-for-condition.helper';
import { isRelativePage, waitForUrlChangeTo } from '../web/url-parser.helper';
import { stringify } from 'querystring';

class Page {
  private url: string;

  public visit() {
    if (config.type === 'otherWeb' || !isRelativePage(this.url)) {
      protractor.browser.ignoreSynchronization = true;

      return protractor.browser.get(this.url);
    }

    return protractor.browser.get(this.url).then(() => protractor.browser.waitForAngular());
  }

  public visitWithParameters(data) {
    const additionalParams = [];

    const url =
      data.raw().reduce((prev, item) => {
        if (prev.indexOf(`:${item[0]}`) === -1) {
          additionalParams.push(item);
          return prev;
        }
        return prev.replace(`:${item[0]}`, item[1]);
      }, this.url) + (additionalParams.length > 0 ? '?' + stringify(additionalParams) : '');

    if (config.type === 'otherWeb' || !isRelativePage(url)) {
      protractor.browser.ignoreSynchronization = true;

      return protractor.browser.get(url);
    }

    return protractor.browser.get(url).then(() => protractor.browser.waitForAngular());
  }

  public async isOn() {
    if (isRelativePage(this.url) && config.type !== 'otherWeb') {
      protractor.browser.ignoreSynchronization = false;
    }

    return browser.wait(async () => {
      const currentUrl = await browser.getCurrentUrl().then(url => url);

      return waitForUrlChangeTo(this.url, currentUrl)(config.baseUrl);
    }, config.waitForPageTimeout * 1000);
  }

  public click(element) {
    return this[element].click();
  }

  public isDisabled(element) {
    return this[element].getAttribute('disabled').then(disabled => ['disabled', true, 'true'].indexOf(disabled) !== -1);
  }

  public isVisible(element) {
    return this[element].isDisplayed();
  }

  public isPresent(element) {
    return this[element].isPresent();
  }

  public getNumberOfElements(elementName) {
    return this[elementName].count();
  }

  public scrollIntoElement(elementName, elementIndex?: string) {
    if (elementIndex !== undefined) {
      return browser.executeScript(
        'arguments[0].scrollIntoView(false);',
        this[elementName].get(elementIndex).getWebElement()
      );
    }

    return browser.executeScript('arguments[0].scrollIntoView(false);', this[elementName].getWebElement());
  }

  public waitForVisibilityOf(elementName) {
    return waitForVisibilityOf(this[elementName]);
  }

  public waitForInvisibilityOf(elementName) {
    return waitForInvisibilityOf(this[elementName]);
  }
}

export default Page;
