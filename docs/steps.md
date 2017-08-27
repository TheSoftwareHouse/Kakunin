##Navigation

###`I visit the ":pageFileName" page`

Visits the url of the page object with `:pageFileName` name.

In order to make it work we create a page object file with a name of `:pageFileName`.

For example in case of: `I visit the "myPage" page` there should be a file `myPage.js` inside the `pages` directory.

If we have a page object with a name `somePageObject.js` defined inside `pages` directory then:

`Given I visit the "somePageObject" page`

will set `this.currentPage` variable to `somePageObject` page and we should end up on `somePageObject` url.

###`I visit the ":pageFileName" page with parameters:`

The same as `I visit the ":pageFileName" page` except allows to pass url parameters.

If url of `myPage` is defined as `this.url = /orders/:orderId/products/:productId` then we can use this step to visit this page by:

``` 
I visit the "myPage" page with parameters:
    | orderId   | 1 |
    | productId | 2 |
```

this will result in visiting the `/orders/1/product/2` page.

### `the ":pageFileName" page is displayed`

Checks if current browser url matches url of `pageFileName` page object. 

If the url matches expected pattern then 
`this.currentPage` variable is set to `pageFileName` page object.

##Forms
todo

##Elements
todo

##Emails
todo

##Files
todo

##Generators
todo

##Debug

###`I pause`

Pauses tests execution and allows to continue manually by pressing combination of `ctrl+c` inside terminal.

###`I wait for ":seconds" seconds`

Waits with execution of next step for an amount provided by parameter `:seconds`.
