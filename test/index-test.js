var vows = require('vows');
var assert = require('assert');
var deck = require('french-deck');


vows.describe('french-deck').addBatch({

  'module': {
    'should report a version': function (x) {
      assert.isString(deck.version);
    },

    'should export Deck': function (x) {
      assert.isFunction(deck.Deck);
    },

    'should export Card': function (x) {
      assert.isFunction(deck.Card);
    },

    'should export Joker': function (x) {
      assert.isFunction(deck.Joker);
    },

    'should export EmptyDeckError': function (x) {
      assert.isFunction(deck.EmptyDeckError);
    }
  }

}).export(module);