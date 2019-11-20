---
id: url-comparator
title: URL comparator
---

## URL Comparator
Pre-conditions:
- `baseUrl` must be set in `kakunin.conf.js`
- `this.url` must be set in page object available under the `/pages/` path
- `this.url` can be set to relative path e.g. `/relative` (in this case, the URL is built based on `baseUrl` set in `kakunin.conf.js`)
- `this.url` can be set to alternative path e.g. `https://new-page/absolute-url` (in this case, the base URL is ignored)

<span style="color:red">For more examples, scroll to the bottom of the page. There's a table with examples.</span>

```javascript 
// kakunin.conf.js
module.exports = {
  baseUrl: 'https://example.com'
}
```

```javascript 
// /pages/example.js
const { BasePage } = require('kakunin');

class ExamplePage extends BasePage {
  constructor() {
    super();

    this.url = '/relative'; // it gives 'https://example.com' + '/relative' (baseUrl + this.url)
  }
}
```

```javascript 
// /pages/example-absolute.js
const { BasePage } = require('kakunin');

class ExampleAbsolutePage extends BasePage {
  constructor() {
    super();

    this.url = 'https://example-absolute.com/absolute'; // it gives 'https://example-absolute.com/absolute' as the baseUrl is ignored
  }
}
```

## Wild cards

We added functionality that allows to parametrise the URLs. 
It's useful when the page url contains value that is dynamic e.g. URL with users details that includes ID.

So to make the Page Object which handles the validation on dynamic pages, you need to add a "wild card" to `this.url`. 
To use "wild card" in Kakunin, you need to replace a dynamic part of URL like an ID with a value that start with `:`.

Every character between ":" sign and "/" will be ignored. In other, it does not matter if wild card is set to ":id" or ":something"!

Examples:
- `https://example-project/users/1001` should be set to `this.url = https://example-project/users/:id`
- `https://example-project/users/1001/page/3` should be set to `this.url = https://example-project/users/:id/page/:pageNumber`

```javascript 
// /pages/example-users.js
const { BasePage } = require('kakunin');

class ExampleUsersPage extends BasePage {
  constructor() {
    super();

    this.url = 'https://example-project/users/:id';
  }
}
```

You can use as many wild card as you want in a URL.

## Query params in URL

Another useful feature is functionality that allows to check query parameters in URL.

For example, if we got an URL `https://example-query/resource?id=fb27c59e-2be6-446d-a5aa-1f6c32d31a68?id2=test`.

It can be verified by setting `this.url` to a regex.
```javascript 
// /pages/example-query.js
const { BasePage } = require('kakunin');

class ExampleQueryPage extends BasePage {
  constructor() {
    super();

    this.url = '/resource?id=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}?id2=test';
  }
}
```

## Compare URLs examples:


  | Page Object URL                                             | Current Browser URL                               | Base URL - config file    | Results   |
  | ----------------------------------------------------------- | ------------------------------------------------- | ------------------------- | --------- |
  | http://localhost:8080/incorrect-data                        | http://localhost:8080/tabular-data                | https://example-url.com   | FALSE     |
  | http://localhost:8080/incorrect-data/                       | http://localhost:8080/tabular-data                | https://example-url.com   | FALSE     |
  | http://google/incorrect-data                                | http://localhost:8080/tabular-data                | https://example-url.com   | FALSE     |
  | http://google/tabular-data                                  | http://localhost:8080/tabular-data                | https://example-url.com   | FALSE     |
  | http://google/incorrect-data/                               | http://localhost:8080/tabular-data                | https://example-url.com   | FALSE     |
  | /incorrect-data                                             | http://website.com/tabular-data                   | https://example-url.com   | FALSE     |
  | /incorrect-data/                                            | http://website.com/tabular-data                   | http://incorrect.com      | FALSE     |
  | http://localhost:8080/tabular-data                          | http://localhost:8080/tabular-data                | https://example-url.com   | TRUE      |
  | http://localhost:8080/tabular-data/                         | http://localhost:8080/tabular-data                | http://localhost:8080     | TRUE      |
  | /tabular-data                                               | http://localhost:8080/tabular-data                | http://localhost:8080     | TRUE      |
  | /tabular-data/                                              | http://localhost:8080/tabular-data                | http://localhost:8080     | TRUE      |
  | /tabular-data                                               | http://localhost:8080/tabular-data                | https://google.pl         | FALSE     |
  | /tabular-data/                                              | http://localhost:8080/tabular-data                | https://google.pl         | FALSE     |
  | /                                                           | https://google.pl/new                             | https://google.pl         | FALSE     |
  |                                                             | https://google.pl/new                             | https://google.pl         | FALSE     |
  |                                                             | http://localhost:8080                             | http://localhost:8080     | TRUE      |
  | /                                                           | https://google.pl                                 | https://google.com        | FALSE     |
  | https://google.com/:example/:name                           | https://google.com/example/janek                  | https://example-url.com   | TRUE      |
  | https://google.com/:name                                    | https://google.com/janek                          | https://example-url.com   | TRUE      |
  | https://google.com/account/:username/settings/display       | https://google.com/account/janek/settings/display | https://example-url.com   | TRUE      |
  | /account/settings/:userType                                 | https://incorrect-host/account/settings/admin     | https://google.com        | FALSE     |
  | /account/settings/:userType/something                       | https://incorrect-host/account/settings/admin     | https://example-url.com   | FALSE     |
  | https://incorrect-host/account/settings/:userType/something | https://incorrect-host/account/settings/admin     | https://example-url.com   | FALSE     |
  | /account/settings/:userType                                 | https://google.com/account/settings/user          | https://google.com        | TRUE      |
  | /resource?id=[0-9a-fA-F]{8}                                 | https://example-query/resource?id=fb27c59e        | https://example-query     | TRUE      |  
  | /resource?id=[0-9a-fA-F]{8}?id2=2                           | https://example-query/resource?id=fb27c59e?id2=2  | https://example-query     | TRUE      |  
  | /resource?id=[0-9a-fA-F]{8}                                 | https://example-query/resource?id=fb27c59e?id2=2  | https://example-query     | FALSE     |  
  | /resource?id=[0-9a-fA-F]{8}?id2=2                           | https://example-query/resource?id=fb27c59e        | https://example-query     | FALSE     |  
  | https://example-query/resource?id=[0-9a-fA-F]{8}            | https://example-query/resource?id=fb27c59e        | https://google.com        | TRUE      |  
  | /resource?id=[0-9a-fA-F]{8}                                 | https://example-query/resource?id=fb27c59e        | https://google.com        | FALSE     |
