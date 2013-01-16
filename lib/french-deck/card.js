var util = require('util');

var Card = exports.Card = function(suit, rank) {
  this.suit = suit;
  this.rank = rank;
};

Card.prototype.toString = function() {
  return this.rank + " of " + this.suit + "s";
};

var Joker = exports.Joker = function() {
  Card.call(this, null, 'joker');
};

util.inherits(Joker, Card);