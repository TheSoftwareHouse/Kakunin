'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForUrlChangeTo = exports.isRelativePage = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const extractDomain = url => _url2.default.parse(url).host;
const extractUrl = url => _url2.default.parse(url).pathname;
const normalizeUrl = url => {
  if (url.length === 0) {
    return extractUrl('/');
  }

  if (url[url.length - 1] === '/' && url.length > 1) {
    return extractUrl(url.substr(0, url.length - 1));
  }

  return extractUrl(url);
};

const compareUrls = (urlSplit, baseUrlSplit) => {
  const resultParameters = {};

  for (let i in urlSplit) {
    const template = baseUrlSplit[i];
    const actual = urlSplit[i];

    if (template.startsWith(':')) {
      resultParameters[template.substr(1)] = actual;
    } else if (template !== actual) {
      return false;
    }
  }

  return resultParameters;
};

const isRelativePage = exports.isRelativePage = url => {
  return url === '' || url[0] === '/';
};

const waitForUrlChangeTo = exports.waitForUrlChangeTo = (newUrl, currentUrl) => {
  return baseUrl => {
    const pageUrl = _url2.default.resolve(baseUrl, newUrl);
    const pageDomain = extractDomain(pageUrl);
    const currentUrlDomain = extractDomain(currentUrl);

    if (pageDomain !== currentUrlDomain) {
      return false;
    }

    const urlSplit = normalizeUrl(currentUrl).split('/');
    const pageUrlSplit = normalizeUrl(pageUrl).split('/');

    if (urlSplit.length !== pageUrlSplit.length) {
      return false;
    }

    return compareUrls(urlSplit, pageUrlSplit);
  };
};