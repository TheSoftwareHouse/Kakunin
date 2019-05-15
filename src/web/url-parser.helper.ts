import * as Url from 'url';

const extractDomain = url => Url.parse(url).host;
const extractUrl = url => {
  const parsedUrl = Url.parse(url);

  if (parsedUrl.hash) {
    return parsedUrl.hash;
  }

  return parsedUrl.pathname;
};

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

  for (const i in urlSplit) {
    if (urlSplit.hasOwnProperty(i) && baseUrlSplit.hasOwnProperty(i)) {
      const template = baseUrlSplit[i];
      const actual = urlSplit[i];

      if (template.startsWith(':')) {
        resultParameters[template.substr(1)] = actual;
      } else if (template !== actual) {
        return false;
      }
    }
  }

  return resultParameters;
};

export const isRelativePage = url => {
  return url === '' || url[0] === '/';
};

export const waitForUrlChangeTo = (newUrl, currentUrl) => {
  return baseUrl => {
    const pageUrl = Url.resolve(baseUrl, newUrl);
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
