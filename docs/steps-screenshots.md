---
id: steps-screenshots
title: Screenshots
---

If you want to extend steps for screenshot please read documentation of `protractor-image-comparison` on [Github](https://github.com/wswebcreation/protractor-image-comparison) or [NPM](https://www.npmjs.com/package/protractor-image-comparison).

In `kakunin.conf.js` there is section:

```javascript 
 imageComparator: {
    baselineFolder: 'baseline',
    temporaryFolder: '.tmp',
    saveAboveTolerance: 5
  },
}
```

- `baselineFolder` Destination of the base images to which new files (generated during the test) are compared. They must be moved manually to the folder.
- `temporaryFolder` Destination where the images generated during the test are localised (by step `I take a screenshot`)
- `saveAboveTolerance` is the percentage deviation between compared images. If the deviation is greater than `saveAboveTolerance` number then the diff `image file` is created, so the differences can be viewed. 

Remember that `I compare...` steps verify if there was created file in diff folder. 


Created screenshot will have generated name in followed format `:screenshotName-browserWidthxbrowserHeight.png` example `picture-1600x900.png`

>After first usage of `I take screenshot...` user should copy manually created file to the `baseline` folder. After that, he can use compare steps. 

# Steps for taking screenshots of the application:

## `I take screenshot of the element ":elementName" and save as a ":screenshotName"`

Takes screenshot of the current `:element` on the page, and save as a `:screenshotName` in the `.tmp` folder which is created automatically.

---

## `I take screenshot of the visible part of the page and save as a ":screenshotName"`

Takes screenshot of the visible part of the page, and save as a `:screenshotName` in the `.tmp` folder which is created automatically. 

---

## `I take full screenshot of the page and save as a ":screenshotName"`

Takes full screenshot of the page, and save as a `:screenshotName` in the `.tmp` folder which is created automatically.

Please remember that this step will not work correctly for the applications which loads dynamically content. We recommend to verify only static pages with this step.

---

## `I compare the screenshot of the element ":elementName" saved as ":screenshotName"`

This step creates a new screenshot of the current state of the element in application, and then compare to the screenshot created with the `I take screenshot of the visible part of the page and save as a ":screenshotName"`. Remember to have the same name for the `:screenshotName`.

---

## `I compare the screenshot of visible the part of the page saved as ":screenshotName"`

This step creates a new screenshot of the visible part of the page, and then compare to the screenshot created with the `I take screenshot of the visible part of the page and save as a ":screenshotName"`. Remember to have the same name for the `:screenshotName`.

---

## `I compare the full screenshot of the page  saved as ":screenshotName"`

This step creates a new full screenshot of the page, and then compare to the screenshot created with the `I take full screenshot of the page and save as a ":screenshotName"`. Remember to have the same name for the `:screenshotName`.

---