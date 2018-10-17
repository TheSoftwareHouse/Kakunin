## Cross-browser

# To run tests with specified browser
There is a possibility to run Kakunin in various browsers:

- Google Chrome (by default) `npm run kakunin` or `npm run kakunin -- --chrome`
- Firefox `npm run kakunin -- --firefox`
- Safari `npm run kakunin -- --safari`

# To run tests in different browsers at once
There is a possibility to run more than one instance of WebDriver by giving an extra parameter to a command line:

- `npm run kakunin --chrome --firefox`


## Safari
### Run tests
1. Open Safari's preferences
2. Enable "Show Develop menu in menu bar"
3. Open "Develop" tab
4. Enable "Allow Remote Automation"

### Troubleshooting
Safari version 12.0:
- drag & drop actions in Kakunin impossible (more details https://github.com/angular/protractor/issues/1526)
