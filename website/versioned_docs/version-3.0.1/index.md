---
id: version-3.0.1-index
title: Getting started
original_id: index
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
npm install cross-env kakunin --save
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
ln -s ../node_modules/kakunin/src/step_definitions/elements.ts kakunin-elements.ts
ln -s ../node_modules/kakunin/src/step_definitions/debug.ts kakunin-debug.ts
ln -s ../node_modules/kakunin/src/step_definitions/file.ts kakunin-file.ts
ln -s ../node_modules/kakunin/src/step_definitions/form.ts kakunin-form.ts
ln -s ../node_modules/kakunin/src/step_definitions/email.ts kakunin-email.ts
ln -s ../node_modules/kakunin/src/step_definitions/generators.ts kakunin-generators.ts
ln -s ../node_modules/kakunin/src/step_definitions/navigation.ts kakunin-navigation.ts 
ln -s ../node_modules/kakunin/src/step_definitions/performance.ts kakunin-performance.ts 
```

For Windows 8+: (you have to do this as administrator)

```bash
mklink kakunin-elements.ts ../node_modules/kakunin/src/step_definitions/elements.ts
mklink kakunin-debug.ts ../node_modules/kakunin/src/step_definitions/debug.ts 
mklink kakunin-file.ts ../node_modules/kakunin/src/step_definitions/file.ts 
mklink kakunin-form.ts ../node_modules/kakunin/src/step_definitions/form.ts 
mklink kakunin-email.ts ../node_modules/kakunin/src/step_definitions/email.ts
mklink kakunin-generators.ts ../node_modules/kakunin/src/step_definitions/generators.ts 
mklink kakunin-navigation.ts ../node_modules/kakunin/src/step_definitions/navigation.ts 
mklink kakunin-performance.ts ../node_modules/kakunin/src/step_definitions/performance.ts 
```

Keep in mind that `mklink` is not available in older Windows distributions.

This will create symlinks inside `step_definitions` directory and make `cucumberjs` plugin recognize kakunin built-in steps.
