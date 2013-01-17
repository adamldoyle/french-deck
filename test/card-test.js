var vows = require('vows');
var assert = require('assert');
var Card = require('french-deck/card').Card;
var Joker = require('french-deck/card').Joker;
var InvalidCardError = require('french-deck').InvalidCardError;


vows.describe('Card').addBatch({

  'when constructing a Card': {
    topic: function() {
      return new Card('club', '2');
    },

    'then suit is correct': function(topic) {
      assert.equal('club', topic.suit);
    },

    'then rank is correct': function(topic) {
      assert.equal('2', topic.rank);
    }
  },

  'when constructing a Card with any valid suit and rank': {
    topic: function() {
      Card.suits.forEach(function(suit) {
        Card.ranks.forEach(function(rank) {
          new Card(suit, rank);
        });
      });
      return true;
    },

    'then no InvalidCardError is thrown': function(value) {
      assert.isTrue(value);
    }
  },

  'when constructing a Card with an invalid suit': {
    topic: function() {
      return new Card('fake', '2');
    },

    'then an InvalidCardError is thrown': function(e) {
      assert.instanceOf(e, InvalidCardError);
    }
  },

  'when constructing a Card with an invalid rank': {
    topic: function() {
      return new Card('club', '11');
    },

    'then an InvalidCardError is thrown': function(e) {
      assert.instanceOf(e, InvalidCardError);
    }
  },

  'when accessing a Card\'s suits': {
    topic: function() {
      return Card.suits;
    },

    'then four suits are returned': function(suits) {
      assert.lengthOf(suits, 4);
    },

    'then the standard suits are returned': function(suits) {
      assert.notEqual(suits.indexOf('club'), -1);
      assert.notEqual(suits.indexOf('heart'), -1);
      assert.notEqual(suits.indexOf('spade'), -1);
      assert.notEqual(suits.indexOf('diamond'), -1);
    }
  },

  'when accessing a Card\'s ranks': {
    topic: function() {
      return Card.ranks;
    },

    'then 13 ranks are returned': function(ranks) {
      assert.lengthOf(ranks, 13);
    },

    'then the standard ranks are returned': function(ranks) {
      for (var i = 2; i < 11; i++) {
        assert.notEqual(ranks.indexOf(i.toString()), -1);
      }
      assert.notEqual(ranks.indexOf('jack'), -1);
      assert.notEqual(ranks.indexOf('queen'), -1);
      assert.notEqual(ranks.indexOf('king'), -1);
      assert.notEqual(ranks.indexOf('ace'), -1);
    }
  },

  'when getting the string representation of a card': {
    topic: function() {
      var card = new Card('club', '2');
      return card.toString();
    },

    'then the rank and suit are included': function(value) {
      assert.equal(value, '2 of clubs')
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
  },

  'when getting the string representation of a joker': {
    topic: function() {
      var card = new Joker();
      return card.toString();
    },

    'then joker is returned': function(value) {
      assert.equal(value, 'joker');
    }
  }

}).export(module);

