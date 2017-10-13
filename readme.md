# Kakunin - automated testing framework

## Documentation

You can find documentation on the official page:   
[https://thesoftwarehouse.github.io/Kakunin/](https://thesoftwarehouse.github.io/Kakunin/)

Or watch a short presentation about the features [on Slideshare](https://www.slideshare.net/thesoftwarehouse/kakunin-e2e-framework-showcase).

## Requirements

TO run the framework you'll need few tools installed:
1. `node v7.0+`
2. `JDK` (for selenium to work)
3. `Chrome`

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
npm install cross-env protractor webdriver-manager kakunin  --save
```
    
Inside `package.json` file; add new script in `scripts` section:
```json
"kakunin": "cross-env NODE_ENV=prod kakunin"
``` 


## Contributing

Feel free to contribute to this project! Just fork the code, make any updated and let us know!


### How to test?

Run `npm run test` to execute both units and functional tests.


### How to build?

Run `npm run build` to build the project


### How to update docs?

Install `mkdocs` tool and its requirements (python required):

```bash
pip install mkdocs mkdocs-material pygments
```

In order to preview documentation type `mkdocs serve` inside kakunin directory.

In order to build static version of documentation type `mkdocs build`.
