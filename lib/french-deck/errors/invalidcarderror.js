/**
 * Exception that signifies the cards suit or rank are invalid.
 * @type {Function}
 */
module.exports = exports = function() {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'InvalidCardError';
};