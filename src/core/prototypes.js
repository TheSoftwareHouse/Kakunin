// eslint-disable-next-line no-extend-native
String.prototype.toCamelCase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

RegExp.escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
