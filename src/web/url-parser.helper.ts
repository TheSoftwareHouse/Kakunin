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

      if (template.includes('?') && actual.includes('?')) {
        const templateQuerySplit = template.split('?');
        const actualQuerySplit = actual.split('?');

        if (templateQuerySplit.length !== actualQuerySplit.length) {
          return false;
        }

        for (const index in templateQuerySplit) {
          if (!new RegExp(templateQuerySplit[index]).test(actualQuerySplit[index])) {
            return false;
          }
        }
      }

      if (template.startsWith(':')) {
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

export const waitForUrlChangeTo = (newUrl, currentUrl) => {
  return baseUrl => {
    const pageUrl = Url.resolve(baseUrl, newUrl);
    const pageDomain = extractDomain(pageUrl);
    const currentUrlDomain = extractDomain(currentUrl);
    const urlSplit = normalizeUrl(currentUrl)
      .split('/')
      .filter(item => item.length > 0);

    const normaliseBaseUrlSplit = () => {
      const pageUrlSplit = normalizeUrl(pageUrl).split('/');

      pageUrlSplit.unshift(baseUrl);

      return decodeURI(pageUrlSplit.join('/'))
        .replace(baseUrl, '')
        .split('/')
        .filter(item => item.length > 0);
    };

    if (pageDomain !== currentUrlDomain) {
      return false;
    }

    if (urlSplit.length !== normaliseBaseUrlSplit().length) {
      return false;
    }

    return compareUrls(urlSplit, normaliseBaseUrlSplit());
  };
};
