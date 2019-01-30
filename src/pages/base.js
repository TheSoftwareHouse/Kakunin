import config from '../core/config.helper';
import { waitForVisibilityOf, waitForInvisibilityOf } from '../web/cucumber/wait-for-condition.helper';
import { isRelativePage, waitForUrlChangeTo } from '../web/url-parser.helper';
import { stringify } from 'querystring';

class Page {
  visit() {
    if (config.type === 'otherWeb' || !isRelativePage(this.url)) {
      protractor.browser.ignoreSynchronization = true;

      return protractor.browser.get(this.url);
    }

    return protractor.browser.get(this.url).then(() => protractor.browser.waitForAngular());
  }

  visitWithParameters(data) {
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

  async isOn() {
    if (isRelativePage(this.url) && config.type !== 'otherWeb') {
      protractor.browser.ignoreSynchronization = false;
    }

    return browser.wait(async () => {
      const currentUrl = await browser.getCurrentUrl().then(url => url);

      return waitForUrlChangeTo(this.url, currentUrl)(config.baseUrl);
    }, config.waitForPageTimeout * 1000);
  }

  click(element) {
    return this[element].click();
  }

  isDisabled(element) {
    return this[element].getAttribute('disabled').then(function(disabled) {
      return ['disabled', true, 'true'].indexOf(disabled) !== -1;
    });
  }

  isVisible(element) {
    return this[element].isDisplayed();
  }

  isPresent(element) {
    return this[element].isPresent();
  }

  getNumberOfElements(elementName) {
    return this[elementName].count();
  }

  scrollIntoElement(elementName, elementIndex = undefined) {
    if (elementIndex !== undefined) {
      return browser.executeScript(
        'arguments[0].scrollIntoView(false);',
        this[elementName].get(elementIndex).getWebElement()
      );
    }

    return browser.executeScript('arguments[0].scrollIntoView(false);', this[elementName].getWebElement());
  }

  waitForVisibilityOf(elementName) {
    return waitForVisibilityOf(this[elementName]);
  }

  waitForInvisibilityOf(elementName) {
    return waitForInvisibilityOf(this[elementName]);
  }
}

export default Page;
