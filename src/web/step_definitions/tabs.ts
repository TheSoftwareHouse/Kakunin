import { When } from 'cucumber';
import { methods } from '../methods';

When(/^I switch to window number "([^"]*)" of a browser$/, (tabNumber) => {
  return methods.navigation.switchWindow(tabNumber);
});

When(/^I close the current browser tab$/, () => {
  return methods.navigation.closeCurrentWindow();
});
