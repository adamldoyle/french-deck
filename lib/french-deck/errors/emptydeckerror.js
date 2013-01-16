/**
 * Exception that signifies the deck was empty when drawing a card.
 * @type {Function}
 */
module.exports = exports = function() {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'EmptyDeckError';
};