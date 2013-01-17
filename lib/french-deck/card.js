var util = require('util')
  , InvalidCardError = require('./errors/invalidcarderror');

/**
 * Construct a new card with the provided suit and rank.
 *
 * If either the suit or rank is invalid, an InvalidCardError is thrown.
 *
 * @param (String) suit  Suit of the card, e.g. heart
 * @param (String  rank  Rank of the card, e.g. 9
 * @constructor
 */
var Card = exports.Card = function(suit, rank) {
  if (Card.suits.indexOf(suit) == -1 || Card.ranks.indexOf(rank) == -1) {
    throw new InvalidCardError();
  }
  this.suit = suit;
  this.rank = rank;
};

/**
 * Array of supported suits.
 * @type {Array}
 */
Card.suits = ['heart', 'diamond', 'spade', 'club'];

/**
 * Array of supported ranks.
 * @type {Array}
 */
Card.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

/**
 * Pretty print the card information.
 * @return {String}  Card information
 */
Card.prototype.toString = function() {
  return this.rank + " of " + this.suit + "s";
};

/**
 * Construct a new card that represents a joker.
 *
 * @constructor
 */
var Joker = exports.Joker = function() {
  this.suit = null;
  this.rank = 'joker';
};
util.inherits(Joker, Card);

/**
 * Pretty print the card information.
 * @return {String}  Card information
 */
Joker.prototype.toString = function() {
  return this.rank;
}