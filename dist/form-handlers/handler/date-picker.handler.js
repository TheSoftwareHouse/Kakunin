'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datePickerHandler = undefined;

var _sugarDate = require('sugar-date');

var _sugarDate2 = _interopRequireDefault(_sugarDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DatePickerHandler = {

  registerFieldType: true,
  fieldType: 'DatePicker',

  toggleModeButtonSelector: by.css('thead button[ng-click="toggleMode()"]'),
  previousYearButtonSelector: by.css('thead button[ng-click="move(-1)"]'),
  nextYearButtonSelector: by.css('thead button[ng-click="move(1)"]'),
  monthsButtonsSelector: by.xpath('//tbody//td/button'),
  daysButtonsSelector: by.xpath('//tbody//td/button/span[not(contains(@class, "text-muted"))]/..'),
  todayButtonSelector: by.css('button[ng-click="select(\'today\', $event)"]'),

  handleFill: function (page, elementName, desiredValue) {
    return page[elementName].click().then(() => {
      return page[elementName].element(this.todayButtonSelector).click().then(() => {
        return page[elementName].click().then(() => {
          return page[elementName].element(this.toggleModeButtonSelector).click().then(() => {
            const formDate = _sugarDate2.default.Date.create(desiredValue);
            const currentDate = _sugarDate2.default.Date.create('now');

            const yearsDiff = this.getCalendarYearsDiff(currentDate, formDate);

            const previousYearButton = page[elementName].element(this.previousYearButtonSelector);
            const nextYearButton = page[elementName].element(this.nextYearButtonSelector);
            const changeYearButton = yearsDiff > 0 ? nextYearButton : previousYearButton;

            const changeYearClicks = [];
            for (let i = 0; i < Math.abs(yearsDiff); i++) {
              changeYearClicks.push(changeYearButton.click());
            }

            return Promise.all(changeYearClicks).then(() => {
              const formMonth = parseInt(_sugarDate2.default.Date.format(formDate, '{M}'));
              const monthIndex = formMonth - 1;

              return page[elementName].all(this.monthsButtonsSelector).get(monthIndex).click().then(() => {
                const daysButtons = page[elementName].all(this.daysButtonsSelector);
                const formDay = parseInt(_sugarDate2.default.Date.format(formDate, '{dd}'));

                return daysButtons.filter(elem => {
                  return elem.getText().then(function (text) {
                    return parseInt(text) === formDay;
                  });
                }).first().click();
              });
            });
          });
        });
      });
    });
  },

  getCalendarYearsDiff: function (currentDate, formDate) {
    const formYear = parseInt(_sugarDate2.default.Date.format(formDate, '{year}'));
    const currentYear = parseInt(_sugarDate2.default.Date.format(currentDate, '{year}'));

    return formYear - currentYear;
  },

  handleCheck: function (page, elementName, desiredValue) {
    return page[elementName].isDisplayed().then(function () {
      return page[elementName].element(by.css('input')).getAttribute('value').then(function (value) {
        const desiredValueDate = _sugarDate2.default.Date.format(_sugarDate2.default.Date.create(desiredValue), '{dd}/{MM}/{yyyy}');

        if (value === desiredValueDate) {
          return Promise.resolve();
        }

        return Promise.reject(`Expected ${desiredValueDate} got ${value} for date picker input element ${elementName}`);
      });
    });
  }

};

const datePickerHandler = exports.datePickerHandler = DatePickerHandler;