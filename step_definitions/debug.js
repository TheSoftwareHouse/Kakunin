module.exports = function() {
  this.Then('I wait for "$number" seconds', function (number) {
    return browser.sleep(parseInt(number) * 1000);
  });

  this.Then('I pause', function () {
    browser.pause();
  });
};
