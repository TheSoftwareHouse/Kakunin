# Kakunin - automated testing framework
#### Migration to 2.2 version

What needs to be done:
1. Remove node_modules
2. Update protractor to newest version - `npm install protractor@latest --save`
3. If you have some custom matchers, make sure to make them return rejected promise on fail. This is done to improve error readability.