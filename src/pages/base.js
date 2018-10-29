import config from '../helpers/config.helper';
import { waitForVisibilityOf, waitForInvisibilityOf } from '../helpers/wait-for-condition.helper';
import { isRelativePage, waitForUrlChangeTo } from '../helpers/url-parser.helper';

class Page {
  visit() {
    if (config.type === 'otherWeb' || !isRelativePage(this.url)) {
      protractor.browser.ignoreSynchronization = true;

      return protractor.browser.get(this.url);
    }

    return protractor.browser.get(this.url).then(() => protractor.browser.waitForAngular());
  }

  visitWithParameters(data) {
    let url = this.url;

    for (const item of data.raw()) {
      url = url.replace(`:${item[0]}`, item[1]);
    }

    if (config.type === 'otherWeb') {
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
