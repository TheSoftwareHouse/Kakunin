## About Kakunin

Kakunin is a Protractor extension created by The Software House sp. z o.o. and Takamol Holding. It allows you
to write e2e test scenarios with a help of Gherkin language and JavaScript for all kind of applications - Angular, React and others.

## Installation

In order to install Kakunin you have to make sure that you have installed:

    node.js - v7.8.0 min
    JDK
    Chrome
    
Create directory for your project
```bash
mkdir my_project
```
    
Go to project directory 
```bash
cd my_project
```
    
Initialize JavaScript project
```bash
npm init
```

Install dependencies
```bash
npm install protractor webdriver-manager kakunin  --save
```
    
Inside `package.json` file; add new script in `scripts` section:
```json
"kakunin": "NODE_ENV=prod kakunin"
``` 

## Configuration

* Create kakunin project 
```bash
npm run kakunin init
```
The above command will run Kakunin's init script.
* Answer what kind of app you're going to test (`default: AngularJS`)
* Enter URL where your tested app will be running (`default: http://localhost:3000`)
* Choose if you plan to use some emails checking service (`default: none`)

And you're set! Now you can run the tests using Kakunin:

```bash
npm run kakunin
```
  
  
## Commands

* `npm run kakunin init [-- --advanced]` - Create a new project by answering few simple questions (you can pass additional parameter to enter advanced mode where you can configure all Kakunin options by yourself)
* `npm run kakunin` - Run test scenarios
* `npm run kakunin -- --tags @someTag` - Run only scenarios tagged by `@someTag`
* `npm run kakunin -- --tags "@someTag and @otherTag"` - Run only scenarios tagged by `@someTag` and `@otherTag` at the same time
* `npm run kakunin -- --tags "@someTag or @otherTag"` - Run only scenarios tagged by `@someTag` or `@otherTag`
* `npm run kakunin -- --tags "not @someTag"` - Run only scenarios not tagged by `@someTag`


## Troubleshooting & Tips

In order to make cucumber steps autosuggestion work properly in JetBrains tools, make sure your project is `ECMAScript 6` compatible and you have `cucumberjs` plugin installed.
Due to non-resolved issue in Jetbrains editors ([see here](https://youtrack.jetbrains.com/issue/WEB-11505)) we'll have to do one more step:
 
Go to `step_definitions` directory 
```bash
cd step_definitions
``` 

Paste this code into terminal and restart your IDE:
(if you're using Windows, you'll have to adapt the command by yourself. Or switch to Linux :) )

```bash
ln -s ../node_modules/kakunin/dist/step_definitions/elements.js kakunin-elements.js
ln -s ../node_modules/kakunin/dist/step_definitions/debug.js kakunin-debug.js
ln -s ../node_modules/kakunin/dist/step_definitions/file.js kakunin-file.js
ln -s ../node_modules/kakunin/dist/step_definitions/form.js kakunin-form.js
ln -s ../node_modules/kakunin/dist/step_definitions/email.js kakunin-email.js
ln -s ../node_modules/kakunin/dist/step_definitions/generators.js kakunin-generators.js
ln -s ../node_modules/kakunin/dist/step_definitions/navigation.js kakunin-navigation.js 
```

This will create symlinks inside `step_definitions` directory and make `cucumberjs` plugin recognize kakunin built-in steps.
