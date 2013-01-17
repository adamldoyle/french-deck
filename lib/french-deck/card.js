var util = require('util')
  , InvalidCardError = require('./errors/invalidcarderror');

var Card = exports.Card = function(suit, rank) {
  if (Card.suits.indexOf(suit) == -1 || Card.ranks.indexOf(rank) == -1) {
    throw new InvalidCardError();
  }
  this.suit = suit;
  this.rank = rank;
};

Card.suits = ['heart', 'diamond', 'spade', 'club'];
Card.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];

Card.prototype.toString = function() {
  return this.rank + " of " + this.suit + "s";
};

var Joker = exports.Joker = function() {
  this.suit = null;
  this.rank = 'joker';
};
util.inherits(Joker, Card);

Joker.prototype.toString = function() {
  return this.rank;
}