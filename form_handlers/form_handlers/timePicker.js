const TimePickerHandler = {

  registerFieldType: true,
  fieldType: 'TimePicker',

  hoursInput: by.css('input[ng-model="hours"]'),
  minutesInput: by.css('input[ng-model="minutes"]'),
  incrementHours: by.css('a[ng-click="incrementHours()"]'),
  incrementMinutes: by.css('a[ng-click="incrementMinutes()"]'),
  decrementHours: by.css('a[ng-click="decrementHours()"]'),
  decrementMinutes: by.css('a[ng-click="decrementMinutes()"]'),

  handleFill: function (page, elementName, desiredValue) {
    return page[elementName].element(this.hoursInput).getAttribute('value').then((hours) => {
      return page[elementName].element(this.minutesInput).getAttribute('value').then((minutes) => {
        const desiredHours = parseInt(desiredValue.split(':')[0]);
        const desiredMinutes = parseInt(desiredValue.split(':')[1]);
        const actualHours = parseInt(hours);
        const actualMinutes = parseInt(minutes);

        const hoursDiff = desiredHours - actualHours;
        const minutesDiff = desiredMinutes - actualMinutes;

        const incrementHoursButton = page[elementName].element(this.incrementHours);
        const incrementMinutesButton = page[elementName].element(this.incrementMinutes);
        const decrementHoursButton = page[elementName].element(this.decrementHours);
        const decrementMinutesButton = page[elementName].element(this.decrementMinutes);

        const changeHoursButton = hoursDiff > 0 ? incrementHoursButton : decrementHoursButton;
        const changeMinutesButton = minutesDiff > 0 ? incrementMinutesButton : decrementMinutesButton;

        const clicks = [];

        for (let i = 0; i < Math.abs(hoursDiff); i++) {
          clicks.push(changeHoursButton.click());
        }

        for (let i = 0; i < Math.abs(minutesDiff); i++) {
          clicks.push(changeMinutesButton.click());
        }

        return Promise.all(clicks);
      });
    });
  },

  handleCheck: function (page, elementName, desiredValue) {
    return Promise.reject('Checking TimePicker is not supported');
  }

};

module.exports = TimePickerHandler;
