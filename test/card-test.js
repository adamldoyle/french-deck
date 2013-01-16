var vows = require('vows');
var assert = require('assert');
var Card = require('french-deck/card').Card;
var Joker = require('french-deck/card').Joker;


vows.describe('Card').addBatch({

  'when constructing a Card': {
    topic: function() {
      return new Card('one', 'two');
    },

    'then suit is correct': function(topic) {
      assert.equal('one', topic.suit);
    },

    'then rank is correct': function(topic) {
      assert.equal('two', topic.rank);
    }
  }

}).export(module);

vows.describe('Joker').addBatch({

  'when constructing a Joker': {
    topic: function() {
      return new Joker();
    },

    'then suit is null': function(topic) {
      assert.isNull(topic.suit);
    },

    'then rank is joker': function(topic) {
      assert.equal('joker', topic.rank);
    },

    'then it is an instanceof Card': function(topic) {
      assert.instanceOf(topic, Card);
    }

  }

}).export(module);

