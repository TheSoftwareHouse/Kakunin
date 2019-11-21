---
id: steps-screenshots
title: Screenshots
---

In `kakunin.conf.js` there is section:

```javascript 
 imageComparator: {
    baselineFolder: 'baseline',
    temporaryFolder: '.tmp',
    saveAboveTolerance: 5
  },
}
```

- `baselineFolder` is path to the folder where you should move your generated images to use compare steps
- `temporaryFolder` is path to the folder where images are generated with `I take screenshot...` steps
- `saveAboveTolerance` is the percentage deviation between compared images. If the deviation is greater then the number then the diff folder is created and the user can easily verify the differences. Remember that `I compare...` steps verify if the was created file in diff folder. 

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