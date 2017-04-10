module.exports = {
  isSatisfiedBy: function (name) {
    return name === 'name';
  },

  generate: function() {
    const names = [
      'Bob',
      'John',
      'Paul'
    ];

    return names[Math.floor(Math.random() * names.length)];
  }
};
