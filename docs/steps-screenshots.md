---
id: steps-screenshots
title: Screenshots
---

FYI: Created screenshot will have generated name in followed format `:screenshotName--browserWidthxxbrowserHeight.png` example `picture-1600x900.png`

# Steps for taking screenshots of the application:

## `I take screenshot of the element ":elementName" and save as a ":screenshotName"`

Takes screenshot of the current `:element` on the page, and save as a `:screenshotName` in the `.tmp` folder which is created automatically.

After first usage user should copy manually created file to the `baseline/desktop_chrome` folder. After that he can use compare steps. 
---

## `I take screenshot of the visible part of the page and save as a ":screenshotName"`

Takes screenshot of the visible part of the page, and save as a `:screenshotName` in the `.tmp` folder which is created automatically. 
---

## `I take full screenshot of the page and save as a ":screenshotName"`

Takes full screenshot of the page, and save as a `:screenshotName` in the `.tmp` folder which is created automatically.

Please remember that this step will not work correctly for the applications which loads dynamiclly content. We recommend to verify only static pages with this step.
---

## `I compare the screenshot of the element ":elementName" saved as ":screenshotName"`

This steps creats a new screenshot of the current state of the element in application, and then compare to the screenshot created with the `I take screenshot of the visible part of the page and save as a ":screenshotName"`. Remember to have same name for the `:screenshotName`.
---

## `I compare the screenshot of visible the part of the page saved as ":screenshotName"`

This steps creats a new screenshot of the of the visible part of the page, and then compare to the screenshot created with the `I take screenshot of the visible part of the page and save as a ":screenshotName"`. Remember to have same name for the `:screenshotName`.
---

## `I compare the full screenshot of the page  saved as ":screenshotName"`

This steps creats a new full screenshot of the page, and then compare to the screenshot created with the `I take full screenshot of the page and save as a ":screenshotName"`. Remember to have same name for the `:screenshotName`.
---


