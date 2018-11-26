---
id: version-2.4.0-performance-testing
title: Performance testing
original_id: performance-testing
---

Performance testing is possible thanks to `browsermob-proxy`.

It saves all data from network tab (Google Chrome console) which is generated during the test.

There is a possibility to compare `TTFB` value with a maximum given one. 

`TTFB` (Time to first byte) measures the duration from the client making an HTTP request to the first byte of a response being received by the client's browser.

More details can be found in documentation - `Built-in steps` section.

# What needs to be done?

## Get started

1. Download `browsermob-proxy` from `https://github.com/lightbody/browsermob-proxy`

2. Navigate in terminal to the catalog

3. Use following command to start the REST API

```
./browsermob-proxy -port 8887
```

## Configuration
1. Add `browsermob-proxy` configuration to `kakunin.conf.js`

You can use one of the following methods to configure browsermob-proxy:

- `npm run kakunin init -- --advanced` and go through the process

- or add it manually to the config file:

```javascript
    "browserMob": {
      "serverPort": 8887,
      "port": 8888,
      "host": "localhost"
    }
```

## Run tests

1. `performance steps` must be used in the scenario where you are testing performance

2. Scenario must have a tag `@performance`

3. Run tests with special parameter:

```
npm run kakunin -- --performance
```

## Results

1. `.har` files are saved in catalog `reports/performance/*.har`
