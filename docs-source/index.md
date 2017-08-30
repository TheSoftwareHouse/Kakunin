## About Kakunin

Kakunin is a Protractor extension created by The Software House sp. z o.o. and Takamol Holding. It allows you
to write e2e test scenarios with a help of Gherkin language and JavaScript for all kind of applications - Angular, React and others.

## Installation

In order to install Kakunin you have to make sure that you have installed:

    node.js - v7.8.0 min
    JDK
    Chrome
    
* Create directory for your project `mkdir my_project`
* Go to project directory `cd my_project`
* Initialize JavaScript project by typing `npm init`
* Open `package.json` file and add required dev dependencies:

```
"webdriver-manager": "12.0.6",
"protractor": "5.1.2",
"kakunin": "git+ssh://git@bitbucket.org/thesoftwarehouse/e2e-pascal.git#fixes"
```

* In `package.json` add new script in `scripts` section:

```
"kakunin": "NODE_ENV=prod kakunin"
``` 

* Install dependencies `npm install`
* Create kakunin project `npm run kakunin init`
* Answer what kind of app you're going to test (`default: NG1`)
* Fill url for your app (`default: http://localhost:3000`)
* Are you going to use some emails checking service ? (`default: none`)
* Run Kakunin's testing features `npm run kakunin`
 
You're read to use Kakunin.

##Tips

In order to use autosuggest functionality in JETBrains tools, make sure your project is `ECMAScript 6` compatible and you have `cucumberjs` plugin installed.
 
If it is, go to `step_definitions` directory `cd step_definitions` and paste this code into terminal and restart your IDE:

```
ln -s ../node_modules/kakunin/dist/step_definitions/elements.js kakunin-elements.js
ln -s ../node_modules/kakunin/dist/step_definitions/debug.js kakunin-debug.js
ln -s ../node_modules/kakunin/dist/step_definitions/file.js kakunin-file.js
ln -s ../node_modules/kakunin/dist/step_definitions/form.js kakunin-form.js
ln -s ../node_modules/kakunin/dist/step_definitions/email.js kakunin-email.js
ln -s ../node_modules/kakunin/dist/step_definitions/generators.js kakunin-generators.js
ln -s ../node_modules/kakunin/dist/step_definitions/navigation.js kakunin-navigation.js 
```

This will create symlinks inside `step_definitions` directory and make `cucumberjs` plugin recognize kakunin built-in steps.
 
## Commands

* `npm run kakunin init [-- --advanced]` - Create a new project by answering few simple questions (you can pass additional parameter to enter advanced mode where you can configure all Kakunin options by yourself)
* `npm run kakunin` - Run test scenarios
* `npm run kakunin -- --tags @someTag` - Run only scenarios tagged by `@someTag`
* `npm run kakunin -- --tags "@someTag and @otherTag"` - Run only scenarios tagged by `@someTag` and `@otherTag` at the same time
* `npm run kakunin -- --tags "@someTag or @otherTag"` - Run only scenarios tagged by `@someTag` or `@otherTag`
* `npm run kakunin -- --tags "not @someTag"` - Run only scenarios not tagged by `@someTag`
