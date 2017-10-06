import config from '../helpers/config.helper';

class Page {
  visit() {
    if (config.type === 'otherWeb' && !this.isRelativePage()) {
      protractor.browser.ignoreSynchronization = true;

      return protractor.browser.get(this.url);
    }

    return protractor.browser.get(this.url).then(() => protractor.browser.waitForAngular());
  }

  visitWithParameters(data) {
    let url  = this.url;

    for (const item of data.raw()) {
      url = url.replace(`:${item[0]}`, item[1]);
    }

    if (config.type === 'otherWeb') {
      return protractor.browser.get(url);
    }

    return protractor.browser.get(url).then(() => protractor.browser.waitForAngular());
  }

  click(element) {
    return this[element].click();
  }

  isDisabled(element) {
    return this[element].getAttribute('disabled').then(function (disabled) {
      return ['disabled', true, 'true'].indexOf(disabled) !== -1;
    });
  }

  isVisible(element) {
    return this[element].isDisplayed();
  }

  isPresent(element) {
    return this[element].isPresent();
  }

  isOn() {
    const self = this;

    if (this.isRelativePage() && config.type !== 'otherWeb') {
      protractor.browser.ignoreSynchronization = false;
    }

    return browser.wait(this.waitForUrlChangeTo(self.url), config.waitForPageTimeout * 1000).then(function (resultParameters) {
      return resultParameters;
    });
  }

  isRelativePage() {
    return (this.url.indexOf('http://') > 1 || this.url.indexOf('http://') === -1)
      && (this.url.indexOf('https://') > 1 || this.url.indexOf('https://') === -1);
  }

  waitForUrlChangeTo(newUrl) {
    return () => {
      const self = this;

      return browser.getCurrentUrl().then(function (url) {
        if (!self.isRelativePage()) {
          const pageDomain = self.extractDomain(newUrl);
          const currentUrlDomain = self.extractDomain(url);

          if (pageDomain !== currentUrlDomain) {
            return false;
          }
        }

        const baseUrl = self.normalizeUrl(newUrl);
        url = self.normalizeUrl(url);

        const urlSplit = url.split('/');
        const baseUrlSplit = baseUrl.split('/');
        const resultParameters = {};

        if (urlSplit.length !== baseUrlSplit.length) {
          return false;
        }

        for (let i = 0; i < urlSplit.length; i++) {
          const template = baseUrlSplit[i];
          const actual = urlSplit[i];

          if (template.startsWith(':')) {
            resultParameters[template.substr(1)] = actual;
          } else if (template !== actual) {
            return false;
          }
        }

        return resultParameters;
      });
    };
  }

  extractDomain(url) {
    let domain;

    if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
    }
    else {
      domain = url.split('/')[0];
    }

    domain = domain.split(':')[0];
    domain = domain.split('?')[0];

    return domain;
  }

  normalizeUrl(url) {
    if (url[url.length-1] === '/') {
      return this.extractUrl(url.substr(0, url.length-1));
    }

    return this.extractUrl(url);
  }

  extractUrl(url) {
    let newUrl = url;

    if (newUrl.indexOf('://') > 0) {
      newUrl = newUrl.substr(newUrl.indexOf('://') + 3);

      if (newUrl.indexOf('/') > 0) {
        newUrl = newUrl.substr(newUrl.indexOf('/'));
      }
    }

    return newUrl;
  }

  getNumberOfElements(elementName) {
    return this[elementName].count();
  }

  scrollIntoElement(elementName, elementIndex = undefined) {
    if (elementIndex !== undefined) {
      return browser.executeScript('arguments[0].scrollIntoView(false);', this[elementName].get(elementIndex).getWebElement());
    }

    return browser.executeScript('arguments[0].scrollIntoView(false);', this[elementName].getWebElement());
  }
}

export default Page;
