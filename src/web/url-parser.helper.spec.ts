import { isRelativePage, waitForUrlChangeTo } from './url-parser.helper';

const exampleBaseUrl = 'https://example-base-url.com';
const localBaseUrl = 'http://localhost:8080';

describe('URL parser', () => {
  it('returns empty string if the regex matches query param - absolute url', () => {
    expect(
      waitForUrlChangeTo(
        'http://localhost:10001/#/create-offering?id=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
        'http://localhost:10001/#/create-offering?id=3c1de646-f26e-48b6-a0d1-7cfabab236dc'
      ).bind(null, exampleBaseUrl)()
    ).toEqual({});
  });

  it('returns empty object if regex matches to the all params', () => {
    expect(
      waitForUrlChangeTo(
        'http://localhost:10001/#/create-offering?id=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}?pin=[0-9]{4}',
        'http://localhost:10001/#/create-offering?id=3c1de646-f26e-48b6-a0d1-7cfabab236dc?pin=1234'
      ).bind(null, exampleBaseUrl)()
    ).toEqual({});
  });

  it('returns false if any paramters are missing', () => {
    expect(
      waitForUrlChangeTo(
        'http://localhost:10001/#/create-offering?id=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}?pin=[0-9]{4}',
        'http://localhost:10001/#/create-offering?id=3c1de646-f26e-48b6-a0d1-7cfabab236dc'
      ).bind(null, exampleBaseUrl)()
    ).toEqual(false);
  });

  it('returns false if there is extra unexpected parameter', () => {
    expect(
      waitForUrlChangeTo(
        'http://localhost:10001/#/create-offering?id=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}?pin=[0-9]{4}',
        'http://localhost:10001/#/create-offering?id=3c1de646-f26e-48b6-a0d1-7cfabab236dc?pin=1234?unexpectedParam=abcd'
      ).bind(null, exampleBaseUrl)()
    ).toEqual(false);
  });

  it('returns false if the domain do not match - abolute url', () => {
    expect(
      waitForUrlChangeTo(
        'https://example-page/create-offering?id=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
        'http://localhost:10001/#/create-offering?id=3c1de646-f26e-48b6-a0d1-7cfabab236dc'
      ).bind(null, localBaseUrl)()
    ).toEqual(false);
  });

  it('returns false if the domain do not match - relative url', () => {
    expect(
      waitForUrlChangeTo(
        '/#/create-offering?id=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
        'http://localhost:10001/#/create-offering?id=3c1de646-f26e-48b6-a0d1-7cfabab236dc'
      ).bind(null, localBaseUrl)()
    ).toEqual(false);
  });

  it('returns empty string if the regex matches query param - relative url with port', () => {
    expect(
      waitForUrlChangeTo(
        '/create-offering?id=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
        'http://localhost:8080/create-offering?id=not-uuid'
      ).bind(null, localBaseUrl)()
    ).toEqual({});
  });

  it('returns empty string if the regex matches query param - relative url', () => {
    expect(
      waitForUrlChangeTo(
        '/create-offering?id=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
        'https://example-base-url.com/create-offering?id=not-uuid'
      ).bind(null, exampleBaseUrl)()
    ).toEqual({});
  });

  it('returns false if a path in absolute URL is incorrect - without slash', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/incorrect-data', 'http://localhost:8080/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a path in absolute URL is incorrect - with slash', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/incorrect-data/', 'http://localhost:8080/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a host in absolute URL is incorrect - without slash', () => {
    expect(
      waitForUrlChangeTo('http://google/incorrect-data', 'http://localhost:8080/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a host path in absolute URL is incorrect - without slash', () => {
    expect(
      waitForUrlChangeTo('http://google/tabular-data', 'http://localhost:8080/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a host in absolute URL is incorrect - with slash', () => {
    expect(
      waitForUrlChangeTo('http://google/incorrect-data/', 'http://localhost:8080/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a path in relative URL is incorrect - without slash', () => {
    expect(waitForUrlChangeTo('/incorrect-data', 'http://website/tabular-data').bind(null, exampleBaseUrl)()).toEqual(
      false
    );
  });

  it('returns false if a path in relative URL is incorrect - with slash', () => {
    expect(
      waitForUrlChangeTo('/incorrect-data/', 'http://website.com/tabular-data').bind(null, 'http://incorrect.com')()
    ).toEqual(false);
  });

  it('returns empty object if a page URL and the current URL are the same - absolute URL without slash and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data', 'http://localhost:8080/#/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual({});
  });

  it('returns false if newUrl does not contain the special sign "#" and the rest is the same - absolute URL', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/tabular-data', 'http://localhost:8080/#/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if currentUrl does not contain the special sign "#" and the rest is the same - absolute URL', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data', 'http://localhost:8080/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if newUrl does not contain the special sign "#" and the rest is the same - relative URL', () => {
    expect(
      waitForUrlChangeTo('/tabular-data', 'http://localhost:8080/#/tabular-data').bind(null, exampleBaseUrl)()
    ).toEqual(false);
  });

  it('returns false if currentUrl does not contain the special sign "#" and the rest is the same - relative URL', () => {
    expect(
      waitForUrlChangeTo('/#/tabular-data', 'http://localhost:8080/tabular-data').bind(null, exampleBaseUrl)()
    ).toEqual(false);
  });

  it('returns empty object if a page URL and the current URL are the same - absolute URL with slash and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data/', 'http://localhost:8080/#/tabular-data/').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual({});
  });

  it('returns empty object if a page URL and the current URL are the same - absolute URL with slash on newUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data/', 'http://localhost:8080/#/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual({});
  });

  it('returns empty object if a page URL and the current URL are the same - absolute URL with slash on currentUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data', 'http://localhost:8080/#/tabular-data/').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual({});
  });

  it('returns empty object if a page URL and the current URL are the same - absolute URL without slash and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data', 'http://localhost:8080/#/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual({});
  });

  it('returns false if a page URL and the current URL are not the same - absolute URL with slash and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/incorrect/', 'http://localhost:8080/#/tabular-data/').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a page URL and the current URL are not the same - absolute URL with slash on newUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/incorrect/', 'http://localhost:8080/#/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a page URL and the current URL are not the same - absolute URL with slash on currentUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/incorrect', 'http://localhost:8080/#/tabular-data/').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a page URL and the current URL are not the same - absolute URL with slash and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data/', 'http://localhost:8080/#/incorrect/').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a page URL and the current URL are not the same - absolute URL with slash on newUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data/', 'http://localhost:8080/#/incorrect').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a page URL and the current URL are not the same - absolute URL with slash on currentUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data', 'http://localhost:8080/#/incorrect/').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if a page URL and the current URL are not the same - relative URL with slash and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('/#/incorrect/', 'http://localhost:8080/#/tabular-data/').bind(null, localBaseUrl)()
    ).toEqual(false);
  });

  it('returns false if a page URL and the current URL are not the same - relative URL with slash on newUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('/#/incorrect', 'http://localhost:8080/#/tabular-data/').bind(null, localBaseUrl)()
    ).toEqual(false);
  });

  it('returns false if a page URL and the current URL are not the same - relative URL with slash on currentUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('/#/incorrect/', 'http://localhost:8080/#/tabular-data').bind(null, localBaseUrl)()
    ).toEqual(false);
  });

  it('returns empty object if a page URL and the current URL are the same - relative URL with slash and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('/#/tabular-data/', 'http://localhost:8080/#/tabular-data/').bind(null, localBaseUrl)()
    ).toEqual({});
  });

  it('returns empty object if a page URL and the current URL are the same - relative URL with slash on currentUrlnewUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('/#/tabular-data', 'http://localhost:8080/#/tabular-data/').bind(null, localBaseUrl)()
    ).toEqual({});
  });

  it('returns empty object if a page URL and the current URL are the same - relative URL with slash on newUrl and special sign "#"', () => {
    expect(
      waitForUrlChangeTo('/#/tabular-data/', 'http://localhost:8080/#/tabular-data').bind(null, localBaseUrl)()
    ).toEqual({});
  });

  it('returns false if the newUrl contains special sign and the currentUrl not', () => {
    expect(
      waitForUrlChangeTo('/tabular-data/', 'http://localhost:8080/#/tabular-data').bind(null, localBaseUrl)()
    ).toEqual(false);
  });

  it('returns false if if the newUrl does not contain special sign and the currentUrl does', () => {
    expect(
      waitForUrlChangeTo('/#/tabular-data/', 'http://localhost:8080/tabular-data').bind(null, localBaseUrl)()
    ).toEqual(false);
  });

  it('returns false if the newUrl contains special sign and the currentUrl not - absolute urls', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data', 'http://localhost:8080/tabular-data/').bind(
        null,
        localBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if if the newUrl does not contain special sign and the currentUrl does - absolute urls', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/tabular-data', 'http://localhost:8080/#/tabular-data/').bind(
        null,
        localBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns false if the url with wildcard is different - with special sign "#"', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/#/tabular-data/:pageId', 'http://localhost:8080/#/tabular-data/').bind(
        null,
        localBaseUrl
      )()
    ).toEqual(false);
  });

  it('returns empty object if the url with wildcard is different - with special sign "#"', () => {
    expect(
      waitForUrlChangeTo(
        'http://localhost:8080/#/tabular-data/:pageId',
        'http://localhost:8080/#/tabular-data/1234'
      ).bind(null, localBaseUrl)()
    ).toEqual({ pageId: '1234' });
  });

  it('returns false if the url with wildcard is different - absolute URL with special sign "#"', () => {
    expect(
      waitForUrlChangeTo('/#/tabular-data/:pageId', 'http://localhost:8080/#/tabular-data/').bind(null, localBaseUrl)()
    ).toEqual(false);
  });

  it('returns empty object if the url with wildcard is different - absolute URL with special sign "#"', () => {
    expect(
      waitForUrlChangeTo('/#/tabular-data/:pageId', 'http://localhost:8080/#/tabular-data/123').bind(
        null,
        localBaseUrl
      )()
    ).toEqual({ pageId: '123' });
  });

  it('returns empty object if a page URL and the current URL are the same - absolute URL without slash', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/tabular-data', 'http://localhost:8080/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual({});
  });

  it('returns empty object if a page URL and the current URL are the same - absolute URL with slash', () => {
    expect(
      waitForUrlChangeTo('http://localhost:8080/tabular-data/', 'http://localhost:8080/tabular-data').bind(
        null,
        exampleBaseUrl
      )()
    ).toEqual({});
  });

  it('returns empty object if a page URL and the current URL paths are the same - relative URL without slash', () => {
    expect(
      waitForUrlChangeTo('/tabular-data', 'http://localhost:8080/tabular-data').bind(null, 'http://localhost:8080')()
    ).toEqual({});
  });

  it('returns empty object if a page URL and the current URL paths are the same - relative URL with slash', () => {
    expect(
      waitForUrlChangeTo('/tabular-data/', 'http://localhost:8080/tabular-data').bind(null, 'http://localhost:8080')()
    ).toEqual({});
  });

  it('returns false if a page URL and the current URL paths are the same but hosts are different - relative URL without slash', () => {
    expect(
      waitForUrlChangeTo('/tabular-data', 'http://localhost:8080/tabular-data').bind(null, 'http://google.pl')()
    ).toEqual(false);
  });

  it('returns false if a page URL and the current URL paths are the same but hosts are different - relative URL with slash', () => {
    expect(
      waitForUrlChangeTo('/tabular-data/', 'http://localhost:8080/tabular-data').bind(null, 'http://google.pl')()
    ).toEqual(false);
  });

  it('returns false if a baseUrl is different than the current one - page URL with slash', () => {
    expect(waitForUrlChangeTo('/', 'https://google.pl/new').bind(null, 'https://google.pl')()).toEqual(false);
  });

  it('returns false if a baseUrl path is different than the current one - empty URL in page', () => {
    expect(waitForUrlChangeTo('', 'https://google.pl/new').bind(null, 'https://google.pl')()).toEqual(false);
  });

  it('returns empty object if a baseUrl and the current one are the same - empty URL in page', () => {
    expect(waitForUrlChangeTo('', 'http://localhost:8080').bind(null, 'http://localhost:8080')()).toEqual({});
  });

  it('returns false if a baseUrl is different than the current one - empty URL in page', () => {
    expect(waitForUrlChangeTo('/', 'https://google.pl').bind(null, 'https://google.com')()).toEqual(false);
  });

  it('returns object with properties defined in a page URL - one wildcard', () => {
    expect(
      waitForUrlChangeTo('https://google.com/:name', 'https://google.com/janek').bind(null, exampleBaseUrl)()
    ).toEqual({ name: 'janek' });
  });

  it('returns object with properties defined in a page URL - one wildcard inside a long URL', () => {
    expect(
      waitForUrlChangeTo(
        'https://google.com/account/:username/settings/display',
        'https://google.com/account/janek/settings/display'
      ).bind(null, exampleBaseUrl)()
    ).toEqual({ username: 'janek' });
  });

  it('returns false if a host is incorrect - one wildcard in relative path', () => {
    expect(
      waitForUrlChangeTo('/account/settings/:userType', 'https://incorrect-host/account/settings/admin').bind(
        null,
        'https://google.com'
      )()
    ).toEqual(false);
  });

  it('returns false if a URL is incorrect - one wildcard in relative path', () => {
    expect(
      waitForUrlChangeTo('/account/settings/:userType/something', 'https://incorrect-host/account/settings/admin').bind(
        null,
        'https://google.com'
      )()
    ).toEqual(false);
  });

  it('returns false if a URL is incorrect - one wildcard in absolute path', () => {
    expect(
      waitForUrlChangeTo(
        'https://incorrect-host/account/settings/:userType/something',
        'https://incorrect-host/account/settings/admin'
      ).bind(null, exampleBaseUrl)()
    ).toEqual(false);
  });

  it('returns object with properties defined in a page URL - one wildcard in relative path', () => {
    expect(
      waitForUrlChangeTo('/account/settings/:userType', 'https://google.com/account/settings/user').bind(
        null,
        'https://google.com'
      )()
    ).toEqual({ userType: 'user' });
  });

  it('returns false if the URL is absolute - http without path', () => {
    expect(isRelativePage('http://google.com')).toEqual(false);
  });

  it('returns false if the URL is absolute - https without path', () => {
    expect(isRelativePage('https://google.com')).toEqual(false);
  });

  it('returns false if the URL is absolute - http with path', () => {
    expect(isRelativePage('http://google.com/with-path')).toEqual(false);
  });

  it('returns false if the URL is absolute - https with parameter', () => {
    expect(isRelativePage('https://google.com/:param/with-path')).toEqual(false);
  });

  it('returns true if the URL is relative', () => {
    expect(isRelativePage('/with-path')).toEqual(true);
  });

  it('returns true if the URL is relative - with parameter', () => {
    expect(isRelativePage('/:path-with-parameter')).toEqual(true);
  });

  it('returns true if the URL contains only slash', () => {
    expect(isRelativePage('/')).toEqual(true);
  });

  it('returns true if the URL is empty', () => {
    expect(isRelativePage('')).toEqual(true);
  });
});
