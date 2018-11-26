---
id: steps-debug
title: Debug
---

# Steps for debugging application:

## `I pause`

Pauses tests execution and allows to continue manually by pressing combination of `ctrl+c` inside terminal.

---

## `I wait for ":seconds" seconds`

Waits with execution of next step for an amount provided by parameter `:seconds`.

---

## `I start performance monitor mode`

It starts performance monitor mode.

Keep in mind that REST API must be started on the port which must configured in `kakunin.conf.js` - `serverPort: 8887`.

More details can be found in documentation file `performance-testing.md`.

---

## `I save performance report file as "fileName"`

It saves `.har` file with a name `fileName` in `reports/performance` catalog.

For example: `exampleReport-1511470954552.har`

Data is generated during the test - network tab in Chrome Chrome console.

Keep in mind:

* `I start performance monitor mode` must be used before this step

* `browserMob.port` must be configured in `kakunin.conf.js`

* `browserMob.host` must be configured in `kakunin.conf.js`

More details can be found in documentation file `performance-testing.md`.

---

## `the requests should take a maximum of "maxTiming" milliseconds`

It compares every `TTFB` timing value from previously saved `.har` report with a `maxTiming` value.

Slow requests are listed in your terminal in red colour.

Keep in mind that `I start performance monitor mode` and `I save performance report file as "fileName"` steps must be executed before this one!

---
