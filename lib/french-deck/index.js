/**
 * Module dependencies.
 */
var Deck = require('./deck')
  , Card = require('./card').Card
  , Joker = require('./card').Joker
  , EmptyDeckError = require('./errors/emptydeckerror');


/**
 * Framework version.
 */
require('pkginfo')(module, 'version');

/**
 * Expose constructors.
 */
exports.Deck = Deck;

exports.Card = Card;
exports.Joker = Joker;

exports.EmptyDeckError = EmptyDeckError;
