---
id: version-3.0.1-headless
title: Headless
original_id: headless
---

# Headless browser control

Currently only Firefox and Google Chrome browser can be run headless.

For the rest of the supported browsers this flag is ignored.

To control headless via command line:
- `npm run kakunin -- --headless` opens browser in headless mode
- `npm run kakunin -- --headless=true` opens browser in headless mode
- `npm run kakunin -- --headless=false` opens browser in normal mode

Also, there is a possibility to set `"headless: "true"` or `"headless: "false"` in the `kakunin.conf.js` config file. 

<span style="color:red">Keep in mind that CLI has greater prority than the cofig file (overides settings on runtime).</span>
