'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../core/config.helper');

var _config2 = _interopRequireDefault(_config);

var _waitForCondition = require('../web/cucumber/wait-for-condition.helper');

var _urlParser = require('../web/url-parser.helper');

var _querystring = require('querystring');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Page {
  visit() {
    if (_config2.default.type === 'otherWeb' || !(0, _urlParser.isRelativePage)(this.url)) {
      protractor.browser.ignoreSynchronization = true;

      return protractor.browser.get(this.url);
    }

    return protractor.browser.get(this.url).then(() => protractor.browser.waitForAngular());
  }

  visitWithParameters(data) {
    const additionalParams = [];

    const url = data.raw().reduce((prev, item) => {
      if (prev.indexOf(`:${item[0]}`) === -1) {
        additionalParams.push(item);
        return prev;
      }
      return prev.replace(`:${item[0]}`, item[1]);
    }, this.url) + (additionalParams.length > 0 ? '?' + (0, _querystring.stringify)(additionalParams) : '');

    if (_config2.default.type === 'otherWeb' || !(0, _urlParser.isRelativePage)(url)) {
      protractor.browser.ignoreSynchronization = true;

      return protractor.browser.get(url);
    }

    return protractor.browser.get(url).then(() => protractor.browser.waitForAngular());
  }

  isOn() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if ((0, _urlParser.isRelativePage)(_this.url) && _config2.default.type !== 'otherWeb') {
        protractor.browser.ignoreSynchronization = false;
      }

      return browser.wait(_asyncToGenerator(function* () {
        const currentUrl = yield browser.getCurrentUrl().then(function (url) {
          return url;
        });

        return (0, _urlParser.waitForUrlChangeTo)(_this.url, currentUrl)(_config2.default.baseUrl);
      }), _config2.default.waitForPageTimeout * 1000);
    })();
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

  getNumberOfElements(elementName) {
    return this[elementName].count();
  }

  scrollIntoElement(elementName, elementIndex = undefined) {
    if (elementIndex !== undefined) {
      return browser.executeScript('arguments[0].scrollIntoView(false);', this[elementName].get(elementIndex).getWebElement());
    }

    return browser.executeScript('arguments[0].scrollIntoView(false);', this[elementName].getWebElement());
  }

  waitForVisibilityOf(elementName) {
    return (0, _waitForCondition.waitForVisibilityOf)(this[elementName]);
  }

  waitForInvisibilityOf(elementName) {
    return (0, _waitForCondition.waitForInvisibilityOf)(this[elementName]);
  }
}

exports.default = Page;