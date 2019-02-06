<h1>
  <p align="center">
    <img src="../data/kakunin_logo.png" alt="kakunin.png" width="550"/>
  </p>
</h1>

<p align="center">
   <img src="../data/travis.png" alt="travis.png" width="25" />
   Current travis build:
   <a href="https://travis-ci.org/TheSoftwareHouse/Kakunin"><img src="https://travis-ci.org/TheSoftwareHouse/Kakunin.svg?branch=master" alt="build status" height="18"></a>
  &emsp;
  <img src="../data/npm.png" alt="npm.png" width="25"/> 
  Current npm version:
  <a href="https://badge.fury.io/js/kakunin"><img src="https://badge.fury.io/js/kakunin.svg" alt="npm version" height="18"></a>
</p>

<p align="center">
  <a href="#getting-started-with-docusaurus">Getting started</a> •
  <a href="#content-management">Content mangment</a> •
  <a href="#versifying">Versifying</a> •
  <a href="#building-application">Building application</a> •
  <a href="#publishing">Publishing</a> •  
  <a href="#full-documentation">Docs</a> •
</p>

<p align="center">
     <img src="../data/pageObjectFeature.gif" alt="pageObjectFeature.gif"/>
</p>

<h1>
</h1>

# Getting started with Docusaurus

1. Make sure all the dependencies for the website are installed:

```sh
# Install dependencies
$ yarn
```
2. Run documentation in local environment. Change directory into `website` folder:

```sh
# Start the site
$ yarn start
```

# Directory Structure

Project file structure look like this:

```
Kakunin/
  docs/
    configuration.md
    extending.md
    ...
  website/
    core/
    node_modules/
    pages/
    static/
      css/
      img/
    package.json
    sidebars.json
    siteConfig.js
```

# Content management
## Adding new content to documentation

1. In `docs/` folder add new markdown file `docs/new-markdown-file.md`

2. In created file on top of the document add:

```markdown
---
id: new-markdown-file
title: New Markdown File
---

New Content...
```
 
Title should be in uppercase - it is displayed in browser tab titile.
Id should be in lowercase - it is used in `website/sidebars.json`.

3. In `website/sidebar.json` add ID of the created markdowns file, into desired array. 

```javascript
{
  "docs": {
    "Kakunin": [
      "quickstart",
      "index",
      "configuration",
      "how-it-works",
      "steps",
      "matchers",
      "transformers",
      "cross-browser",
      "parallel-testing",
      "performance-testing",
      "extending",
      "new-markdown-file"
    ]
  }
}

```

4. Test your site locally to confirm changes.  


## Editing an existing docs page

1. To edit file open in `docs` folder open file which should be edited `docs/new-markdown-file.md`
2. Change content of file
3. Test your site locally to confirm changes.  

# Versifying

Docusaurus support versifying, right now we started to using this feature from  `2.4.0` Kakunin version.

1. To add new version of documentation open `website/` folder
2. Run `yarn run version [version]` example `yarn run version 2.4.0-1`
3. After that in `website/` will be created 2 folders `versioned_docs/` & `versioned_sidebars/`
4. In `versioned_docs/` will be created folder `version-2.4.0-1` 
5. In `versioned_sidebars/` there will be created json file with changed sidebar `version-2.4.0-sidebars.json`.  
**In those folders there are only files which was added or changed!**
6. After that our latest version will be `2.4.0-1`

# Building application

1. To build application in `website/` folder run `yarn build` 
2. After that in `website/build/Kakunin` will be created application for latest version `2.4.0-1`

# Publishing

To publish changes run: `GIT_USER=<USER> CURRENT_BRANCH=next USE_SSH=true npm run publish-gh-pages` where <USER> is your github user.

# Full Documentation

Full documentation can be found on the [website](https://docusaurus.io/).
