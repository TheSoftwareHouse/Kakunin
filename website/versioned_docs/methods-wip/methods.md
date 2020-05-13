## Methods

# //TODO Add some introduction why and how to use it?

To use `methods` import them to your file, where you would like to use in steps.


```javascript
import { methods, When } from 'kakunin'

When(/^I click the "([^"]*)" element$/, function(elementName) {
  return methods.interactions.click(this.currentPage, elementName);
}); 
```

---

