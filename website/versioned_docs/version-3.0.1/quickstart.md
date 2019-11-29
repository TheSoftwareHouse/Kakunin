---
id: version-3.0.1-quickstart
title: Quick start
original_id: quickstart
---
As a quick demonstration of the framework let's test the 
[React variant of TodoMVC](http://todomvc.com/examples/react/#/) project. 
Of course other testing other frameworks is possible, you can try it 
by yourself!

## Install packages
In order to install Kakunin you have to make sure that you have installed:

```text
node.js - v7.8.0 min
JDK
Chrome
```
  
Create directory for your project and enter it

```bash
$mkdir my_project
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

Inside `package.json` file add new script in `scripts` section:
```js
...
"scripts": {
  "kakunin": "cross-env NODE_ENV=prod kakunin"
},
...
```

## Configure Kakunin
Run initialization command 

```bash
npm run kakunin init
```

Answer literally few questions:

```text
What kind of application would you like to test? : otherWeb
        
What is base url? [http://localhost:3000]: http://todomvc.com
           
What kind of email service would you like to use?: none
```  
And you're set! Now let's write some test!

## Test the app

Create a page object that will contain instructions on how to locate elements in the projects.
Create a file `pages/main.js`:

```javascript
const { BasePage } = require('kakunin');

class MainPage extends BasePage {
    constructor() {
        super();

        // define the main url for the page
        this.url = '/examples/react/#/';

        // whole form tag
        this.addTodoForm = $('.todoapp');

        // input field
        this.todoInput = $('input.new-todo');

        // list of currently added todos
        this.todos = $$('.todo-list .view');
        this.todoLabel = by.css('label');

        // first todo item in a list
        this.firstTodoItem = this.todos.get(0);
    }
}

module.exports = MainPage;
```

Now that we have prepared the locators, we can start writing our test. Let's test adding new todo item. 

Create a file named: `features/adding_todo.feature` with the following contents:

```gherkin
Feature:

    Scenario: Adding todo
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And the "addTodoForm" element is visible
        When I fill the "addTodoForm" form with:
            | todoInput | My new todo |
        And I press the "enter" key
        Then there are "equal 1" "todos" elements

```

And that's it! All you have to do now is to run the test and watch the magic happens ;)

```bash
npm run kakunin
```

The tests may run quite fast so you might not been able to see that it 
really works as expected. To check if the todo items has been really 
added to the list, let's use a simple hack - let's pause the running 
test right after the todo has been added. 

To do that, let's upgrade our Scenario. Update the file:
```gherkin
Feature:

    Scenario: Adding todo
        Given I visit the "main" page
        And I wait for "visibilityOf" of the "addTodoForm" element
        And the "addTodoForm" element is visible
        When I fill the "addTodoForm" form with:
            | todoInput | My new todo |
        And I wait for "1" seconds
        And I press the "enter" key
        When I fill the "addTodoForm" form with:
            | todoInput | Another todo item! |
        And I wait for "1" seconds
        And I press the "enter" key
        Then there are "equal 2" "todos" elements
        Then I wait for "5" seconds

``` 

As you can see, we've added 1 new step that waits for a second before 
"pressing" the `enter` key. We've also added a second todo item with 
a short pause at the end of the test so you can see the changes.

If you want to see what can we do more with the TodoMVC project, take a look 
at the `example` dir, where you'll find a complete set of test for the project.
