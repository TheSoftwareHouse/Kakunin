import { expect } from 'chai';
import { isRelativePage, waitForUrlChangeTo } from '../helpers/url-parser.helper';

const exampleBaseUrl = 'https://example-base-url.com';

describe('URL parser', () => {
  it('returns false if a path in absolute URL is incorrect - without slash', () => {
    expect(waitForUrlChangeTo('http://localhost:8080/incorrect-data', 'http://localhost:8080/tabular-data')
      .bind(null, exampleBaseUrl)())
      .to.equal(false);
  });

  it('returns false if a path in absolute URL is incorrect - with slash', () => {
    expect(waitForUrlChangeTo('http://localhost:8080/incorrect-data/', 'http://localhost:8080/tabular-data')
      .bind(null, exampleBaseUrl)())
      .to.equal(false);
  });

  it('returns false if a host in absolute URL is incorrect - without slash', () => {
    expect(waitForUrlChangeTo('http://google/incorrect-data', 'http://localhost:8080/tabular-data')
      .bind(null, exampleBaseUrl)())
      .to.equal(false);
  });

  it('returns false if a host path in absolute URL is incorrect - without slash', () => {
    expect(waitForUrlChangeTo('http://google/tabular-data', 'http://localhost:8080/tabular-data')
      .bind(null, exampleBaseUrl)())
      .to.equal(false);
  });

  it('returns false if a host in absolute URL is incorrect - with slash', () => {
    expect(waitForUrlChangeTo('http://google/incorrect-data/', 'http://localhost:8080/tabular-data')
      .bind(null, exampleBaseUrl)())
      .to.equal(false);
  });

  it('returns false if a path in relative URL is incorrect - without slash', () => {
    expect(waitForUrlChangeTo('/incorrect-data', 'http://website/tabular-data')
      .bind(null, exampleBaseUrl)())
      .to.equal(false);
  });

  it('returns false if a path in relative URL is incorrect - with slash', () => {
    expect(waitForUrlChangeTo('/incorrect-data/', 'http://website.com/tabular-data')
      .bind(null, 'http://incorrect.com')())
      .to.equal(false);
  });

  it('returns empty object if a page URL and the current URL are the same - absolute URL without slash', () => {
    expect(waitForUrlChangeTo('http://localhost:8080/tabular-data', 'http://localhost:8080/tabular-data')
      .bind(null, exampleBaseUrl)())
      .to.eql({});
  });

  it('returns empty object if a page URL and the current URL are the same - absolute URL with slash', () => {
    expect(waitForUrlChangeTo('http://localhost:8080/tabular-data/', 'http://localhost:8080/tabular-data')
      .bind(null, exampleBaseUrl)())
      .to.eql({});
  });

  it('returns empty object if a page URL and the current URL paths are the same - relative URL without slash', () => {
    expect(waitForUrlChangeTo('/tabular-data', 'http://localhost:8080/tabular-data')
      .bind(null, 'http://localhost:8080')())
      .to.eql({});
  });

  it('returns empty object if a page URL and the current URL paths are the same - relative URL with slash', () => {
    expect(waitForUrlChangeTo('/tabular-data/', 'http://localhost:8080/tabular-data')
      .bind(null, 'http://localhost:8080')())
      .to.eql({});
  });

  it('returns false if a page URL and the current URL paths are the same but hosts are different - relative URL without slash', () => {
    expect(waitForUrlChangeTo('/tabular-data', 'http://localhost:8080/tabular-data')
      .bind(null, 'http://google.pl')())
      .to.equal(false);
  });

  it('returns false if a page URL and the current URL paths are the same but hosts are different - relative URL with slash', () => {
    expect(waitForUrlChangeTo('/tabular-data/', 'http://localhost:8080/tabular-data')
      .bind(null, 'http://google.pl')())
      .to.equal(false);
  });

  it('returns false if a baseUrl is different than the current one - page URL with slash', () => {
    expect(waitForUrlChangeTo('/', 'https://google.pl/new')
      .bind(null, 'https://google.pl')())
      .to.equal(false);
  });

  it('returns false if a baseUrl path is different than the current one - empty URL in page', () => {
    expect(waitForUrlChangeTo('', 'https://google.pl/new')
      .bind(null, 'https://google.pl')())
      .to.equal(false);
  });

  it('returns empty object if a baseUrl and the current one are the same - empty URL in page', () => {
    expect(waitForUrlChangeTo('', 'http://localhost:8080')
      .bind(null, 'http://localhost:8080')())
      .to.eql({});
  });

  it('returns false if a baseUrl is different than the current one - empty URL in page', () => {
    expect(waitForUrlChangeTo('/', 'https://google.pl')
      .bind(null, 'https://google.com')())
      .to.equal(false);
  });

  it('returns object with properties defined in a page URL - one wildcard', () => {
    expect(waitForUrlChangeTo('https://google.com/:name', 'https://google.com/janek')
      .bind(null, exampleBaseUrl)())
      .to.eql({ name: 'janek' });
  });

  it('returns object with properties defined in a page URL - one wildcard inside a long URL', () => {
    expect(waitForUrlChangeTo('https://google.com/account/:username/settings/display', 'https://google.com/account/janek/settings/display')
      .bind(null, exampleBaseUrl)())
      .to.eql({ username: 'janek' });
  });

  it('returns false if a host is incorrect - one wildcard in relative path', () => {
    expect(waitForUrlChangeTo('/account/settings/:userType', 'https://incorrect-host/account/settings/admin')
      .bind(null, 'https://google.com')())
      .to.equal(false);
  });

  it('returns false if a URL is incorrect - one wildcard in relative path', () => {
    expect(waitForUrlChangeTo('/account/settings/:userType/something', 'https://incorrect-host/account/settings/admin')
      .bind(null, 'https://google.com')())
      .to.equal(false);
  });

  it('returns false if a URL is incorrect - one wildcard in absolute path', () => {
    expect(waitForUrlChangeTo('https://incorrect-host/account/settings/:userType/something', 'https://incorrect-host/account/settings/admin')
      .bind(null, exampleBaseUrl)())
      .to.equal(false);
  });

  it('returns object with properties defined in a page URL - one wildcard in relative path', () => {
    expect(waitForUrlChangeTo('/account/settings/:userType', 'https://google.com/account/settings/user')
      .bind(null, 'https://google.com')())
      .to.eql({ userType: 'user' });
  });

  it('returns false if the URL is absolute - http without path', () => {
    expect(isRelativePage('http://google.com')).to.equal(false);
  });

  it('returns false if the URL is absolute - https without path', () => {
    expect(isRelativePage('https://google.com')).to.equal(false);
  });

  it('returns false if the URL is absolute - http with path', () => {
    expect(isRelativePage('http://google.com/with-path')).to.equal(false);
  });

  it('returns false if the URL is absolute - https with parameter', () => {
    expect(isRelativePage('https://google.com/:param/with-path')).to.equal(false);
  });

  it('returns true if the URL is relative', () => {
    expect(isRelativePage('/with-path')).to.equal(true);
  });

  it('returns true if the URL is relative - with parameter', () => {
    expect(isRelativePage('/:path-with-parameter')).to.equal(true);
  });

  it('returns true if the URL contains only slash', () => {
    expect(isRelativePage('/')).to.equal(true);
  });

  it('returns true if the URL is empty', () => {
    expect(isRelativePage('')).to.equal(true);
  });
});
