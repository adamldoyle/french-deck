var Card = require('./card').Card;
var Joker = require('./card').Joker;
var EmptyDeckError = require('./errors/emptydeckerror');

/**
 * Construct a new deck of unshuffled cards.
 *
 * Configuration:
 *   - (Number) decks    Number of total decks. Default 1.
 *   - (Number) jokers   Number of total jokers to add to deck(s). Default 0.
 *
 * @param (Object) cfg  Configuration
 * @constructor
 */
var Deck = module.exports = exports = function(cfg) {
  this._cfg = cfg || {};

  this._undealt = Array();
  this._dealt = Array();

  this._build();
};

/**
 * Add cards and jokers to undealt array within deck.
 * @private
 */
Deck.prototype._build = function() {
  var self = this;

  var deck_count = self._cfg.decks || 1;
  for (var i = 0; i < deck_count; i++) {
    Card.suits.forEach(function(suit) {
      Card.ranks.forEach(function(rank) {
        self._undealt.push(new Card(suit, rank));
      });
    });
  }

  var joker_count = self._cfg.jokers || 0;
  for (var i = 0; i < joker_count; i++) {
    self._undealt.push(new Joker());
  }
};

/**
 * Shuffle undealt cards.
 */
Deck.prototype.shuffle = function() {
  var self = this;

  for (var i = self._undealt.length-1; i > -1; i--) {
    var j = Math.floor(Math.random() * self._undealt.length);

    var temp = self._undealt[i];
    self._undealt[i] = self._undealt[j];
    self._undealt[j] = temp;
  }
};

/**
 * Draw a single card from the deck.
 * @return Card from top of deck if available, EmptyDeckException otherwise.
 */
Deck.prototype.draw = function() {
  var self = this;

  if (self._undealt.length === 0) {
    throw new EmptyDeckError();
  }

  var card = self._undealt.shift();
  self._dealt.push(card);
  return card;
};

/**
 * Round-robin deal cards into a number of distinct hands.
 * @param numberOfCards Number of cards to deal to each hand. Default 1.
 * @param numberOfHands Number of hands to deal. Default 1.
 * @return {Array} Hands containing desired number of cards, if available. EmptyDeckException otherwise.
 */
Deck.prototype.deal = function(numberOfCards, numberOfHands) {
  var self = this;

  numberOfCards = numberOfCards || 1;
  numberOfHands = numberOfHands || 1;

  var hands = Array();

  for (var i = 0; i < numberOfHands; i++) {
    hands[i] = Array();
  }

  for (var j = 0; j < numberOfCards; j++) {
    for (var i = 0; i < numberOfHands; i++) {
      hands[i].push(self.draw());
    }
  }

  return hands;
};

/**
 * Move all dealt cards to undealt and shuffle.
 */
Deck.prototype.reset = function() {
  var self = this;

  self._undealt = self._undealt.concat(self._dealt);
  self._dealt = Array();

  self.shuffle();
};