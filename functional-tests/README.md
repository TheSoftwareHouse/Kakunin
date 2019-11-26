### Functional tests
Beside unit tests, we added another layer of functional tests where we use:
- Kakunin as a framework which runs the tests
- Express static page with various forms and elements available on `/functional-tests/www/` path

Kakunin version is taken from the `../` catalog, so remember to make `npm run build` in a root catalog.

It is a seperated project in the Kakunin.

### How it works?
Whenever we add a new functionality e.g. new step. We add a new test or scenario where it is being verified.
The application is being extended by new features when neeeded.

### How to start tests?
From a root catalog:
1. Run a command `npm run functional` - the safest way (makes build, install dependencies and run tests)

Inside `/functional-tests`
1. Make a build inside the root catalog
2. In root folder, use a command `cd functional-tests`
3. Make sure that the `package-lock.json` is up-to date
4. Use a command `npm install` to install dependencies
5. Use a command `npm start` to start the express app
6. Use a command `npm run kakunin` to run tests