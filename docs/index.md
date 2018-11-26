---
id: index
title: Getting started
---

## About Kakunin

Kakunin is a Protractor extension created by The Software House sp. z o.o. and Takamol Holding. It allows you
to write e2e test scenarios with a help of Gherkin language and JavaScript for all kind of applications - Angular, React and others.

## Installation

In order to install Kakunin you have to make sure that you have installed:

```text
node.js - v7.8.0 min
JDK
Chrome
```
  
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
npm install cross-env protractor webdriver-manager kakunin  --save
```
    
Inside `package.json` file; add new script in `scripts` section:
```json
"kakunin": "cross-env NODE_ENV=prod kakunin"
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

Also, there is a possibility to answer these question by a command line.
```text
npm run kakunin init -- --baseUrl https://google.com --type otherWeb --emailType none
```
Available parameters: `baseUrl`, `type`, `emailType`, `emailApiKey`, `emailInboxId`.
You will not be asked about question that you already answered by a command.

After the init process, a project files should be automatically created in your directory.

This is an example of a console output after the init process is completed:
```text
Created file at path /Users/example-user/projects/test/kakunin.conf.js
Created directory at path /Users/<user>/TSHProjects/test/reports
Created directory at path /Users/<user>/TSHProjects/test/reports/report
Created directory at path /Users/<user>/TSHProjects/test/reports/report/features
Created directory at path /Users/<user>/TSHProjects/test/reports/performance
Created directory at path /Users/<user>/TSHProjects/test/downloads
Created directory at path /Users/example-user/projects/test/data
Created directory at path /Users/example-user/projects/test/features
Created directory at path /Users/example-user/projects/test/pages
Created directory at path /Users/example-user/projects/test/matchers
Created directory at path /Users/example-user/projects/test/generators
Created directory at path /Users/example-user/projects/test/form_handlers
Created directory at path /Users/example-user/projects/test/step_definitions
Created directory at path /Users/example-user/projects/test/comparators
Created directory at path /Users/example-user/projects/test/dictionaries
Created directory at path /Users/example-user/projects/test/regexes
Created directory at path /Users/example-user/projects/test/hooks
Created directory at path /Users/example-user/projects/test/transformers
Created directory at path /Users/example-user/projects/test/emails
Created file at path /Users/example-user/projects/test/downloads/.gitkeep
Created file at path /Users/example-user/projects/test/reports/report/.gitkeep
Created file at path /Users/example-user/projects/test/reports/report/features/.gitkeep
Created file at path /Users/example-user/projects/test/reports/performance/.gitkeep
Created file at path /Users/example-user/projects/test/features/example.feature
Created file at path /Users/example-user/projects/test/pages/page.js
Created file at path /Users/example-user/projects/test/matchers/matcher.js
Created file at path /Users/example-user/projects/test/generators/generator.js
Created file at path /Users/example-user/projects/test/step_definitions/steps.js
Created file at path /Users/example-user/projects/test/regexes/regex.js
Created file at path /Users/example-user/projects/test/hooks/hook.js
```

And you're set! Now you can run the tests using Kakunin:

```bash
npm run kakunin
```
  
  
## Commands

* Create a new project by answering few simple questions (you can pass additional parameter to enter advanced mode where you can configure all Kakunin options by yourself)

    ```bash 
    npm run kakunin init [-- --advanced]
    ``` 
* Run test scenarios

    ```bash
    npm run kakunin
    ```
* Run only scenarios tagged by `@someTag`

     ```bash
     npm run kakunin -- --tags @someTag
     ``` 
* Run only scenarios tagged by `@someTag` and `@otherTag` at the same time
 
    ```bash
    npm run kakunin -- --tags "@someTag and @otherTag"
    ```
 
* Run only scenarios tagged by `@someTag` or `@otherTag`
     
     ```bash
     npm run kakunin -- --tags "@someTag or @otherTag"
     ```
  
* Run only scenarios not tagged by `@someTag` 

    ```bash
    npm run kakunin -- --tags "not @someTag"
    ```

## Troubleshooting & Tips

In order to make cucumber steps autosuggestion work properly in JetBrains tools, make sure your project is `ECMAScript 6` compatible and you have `cucumberjs` plugin installed.
Due to non-resolved issue in Jetbrains editors ([see here](https://youtrack.jetbrains.com/issue/WEB-11505)) we'll have to do one more step:
 
Go to `step_definitions` directory 
```bash
cd step_definitions
``` 

Paste this code into terminal and restart your IDE:

For Linux/MacOs:

```bash
ln -s ../node_modules/kakunin/dist/step_definitions/elements.js kakunin-elements.js
ln -s ../node_modules/kakunin/dist/step_definitions/debug.js kakunin-debug.js
ln -s ../node_modules/kakunin/dist/step_definitions/file.js kakunin-file.js
ln -s ../node_modules/kakunin/dist/step_definitions/form.js kakunin-form.js
ln -s ../node_modules/kakunin/dist/step_definitions/email.js kakunin-email.js
ln -s ../node_modules/kakunin/dist/step_definitions/generators.js kakunin-generators.js
ln -s ../node_modules/kakunin/dist/step_definitions/navigation.js kakunin-navigation.js 
```

For Windows 8+: (you have to do this as administrator)

```bash
mklink kakunin-elements.js ..\node_modules\kakunin\dist\step_definitions\elements.js"
mklink kakunin-debug.js ..\node_modules\kakunin\dist\step_definitions\debug.js"
mklink kakunin-file.js ..\node_modules\kakunin\dist\step_definitions\file.js"
mklink kakunin-form.js ..\node_modules\kakunin\dist\step_definitions\form.js"
mklink kakunin-email.js ..\node_modules\kakunin\dist\step_definitions\email.js"
mklink kakunin-generators.js ..\node_modules\kakunin\dist\step_definitions\generators.js"
mklink kakunin-navigation.js ..\node_modules\kakunin\dist\step_definitions\navigation.js"
```

Keep in mind that `mklink` is not available in older Windows distributions.

This will create symlinks inside `step_definitions` directory and make `cucumberjs` plugin recognize kakunin built-in steps.
