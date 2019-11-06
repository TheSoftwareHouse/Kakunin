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

const compareQueryParams = (template, actual) => {
  const templateQuerySplit = template.split('?');
  const actualQuerySplit = actual.split('?');

  if (templateQuerySplit.length !== actualQuerySplit.length) {
    return false;
  }

  for (const index in templateQuerySplit) {
    if (templateQuerySplit[index].startsWith(':')) {
      continue;
    }

    if (!new RegExp(templateQuerySplit[index]).test(actualQuerySplit[index])) {
      return false;
    }
  }

  return {};
};

const compareUrls = (urlSplit, baseUrlSplit) => {
  const resultParameters = {};

  for (const i in urlSplit) {
    if (urlSplit.hasOwnProperty(i) && baseUrlSplit.hasOwnProperty(i)) {
      const template = baseUrlSplit[i];
      const actual = urlSplit[i];

      if (template.includes('?') && actual.includes('?')) {
        return compareQueryParams(template, actual);
      }

      if (template.startsWith(':') && !template.includes('?')) {
        resultParameters[template.substr(1)] = actual;
      } else if (template !== actual && !template.includes('?')) {
        return false;
      }
    }
  }

  return resultParameters;
};

export const isRelativePage = url => {
  return url === '' || url[0] === '/';
};

const normaliseAndSplitBaseUrl = (pageUrlSplit, baseUrl) => {
  pageUrlSplit.unshift(baseUrl);

  return decodeURI(pageUrlSplit.join('/'))
    .replace(baseUrl, '')
    .split('/')
    .filter(item => item.length > 0);
};

export const waitForUrlChangeTo = (newUrl, currentUrl) => {
  return baseUrl => {
    const pageUrl = Url.resolve(baseUrl, newUrl);
    const pageDomain = extractDomain(pageUrl);
    const currentUrlDomain = extractDomain(currentUrl);
    const pageUrlSplit = normalizeUrl(pageUrl).split('/');
    const urlSplit = normalizeUrl(currentUrl)
      .split('/')
      .filter(item => item.length > 0);
    const normalisedBaseUrlSplitted = normaliseAndSplitBaseUrl(pageUrlSplit, baseUrl);

    if (pageDomain !== currentUrlDomain) {
      return false;
    }

    if (urlSplit.length !== normalisedBaseUrlSplitted.length) {
      return false;
    }

    return compareUrls(urlSplit, normalisedBaseUrlSplitted);
  };
};
