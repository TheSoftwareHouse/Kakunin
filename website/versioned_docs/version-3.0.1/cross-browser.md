---
id: version-3.0.1-cross-browser
title: Cross-browser testing
original_id: cross-browser
---

## To run tests with specified browser
There is a possibility to run Kakunin in various browsers:

- Google Chrome (by default) `npm run kakunin` or `npm run kakunin -- --chrome`
- Firefox `npm run kakunin -- --firefox`
- Safari `npm run kakunin -- --safari`
- Internet Explorer `npm run kakunin -- --ie` <span style="color:blue">(supported versions IE8, IE9, IE10, IE11)</span>

## To run tests in different browsers at once
There is a possibility to run more than one instance of WebDriver by giving an extra parameter to a command line:

- `npm run kakunin --chrome --safari`

Currently, there is a problem with running more than one instance of Firefox!

## Safari
### Run tests
1. Open Safari's preferences
2. Enable "Show Develop menu in menu bar"
3. Open "Develop" tab
4. Enable "Allow Remote Automation"

## Internet Explorer
### Configure the browser
1. Open Internet options and set:
- IE browser zoom level to 100 procent
- IE Security level: keep all of the tabs either checked / unchecked (Itnernet, Local internet, Trusted sites, Restricted sites)

### Troubleshooting
Safari version 12.0:
- drag & drop actions in Kakunin impossible (more details https://github.com/angular/protractor/issues/1526)
