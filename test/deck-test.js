var vows = require('vows');
var assert = require('assert');
var Deck = require('french-deck/deck');
var Card = require('french-deck/card').Card;
var Joker = require('french-deck/card').Joker;
var EmptyDeckError = require('french-deck/errors/emptydeckerror');


vows.describe('Deck()').addBatch({

  'when constructing a deck with no config parameters': {
    topic: function() {
      return new Deck();
    },

    'then there are 52 undealt cards': function(topic) {
      assert.lengthOf(topic._undealt, 52);
    },

    'then there are 0 dealt cards': function(topic) {
      assert.lengthOf(topic._dealt, 0);
    },

    'then there are no jokers': function(topic) {
      topic._undealt.forEach(function(card) {
        assert.isFalse(card instanceof Joker);
      });
    },

    'then there is one unshuffled deck with one of each card': function(topic) {
      var i = 0;
      Card.suits.forEach(function(suit) {
        Card.ranks.forEach(function(rank) {
          var card = topic._undealt[i++];
          assert.equal(card.suit, suit);
          assert.equal(card.rank, rank);
        });
      });
    }
  },

  'when constructing a deck with jokers config parameter': {
    topic: function() {
      return new Deck({ jokers: 2 });
    },

    'then there are 54 undealt cards': function(topic) {
      assert.lengthOf(topic._undealt, 54);
    },

    'then there are 0 dealt cards': function(topic) {
      assert.lengthOf(topic._dealt, 0);
    },

    'then there are 2 jokers': function(topic) {
      assert.instanceOf(topic._undealt[topic._undealt.length - 2], Joker);
      assert.instanceOf(topic._undealt[topic._undealt.length - 1], Joker);
    }
  },

  'when constructing a deck with decks config parameter': {
    topic: function() {
      return new Deck({ decks: 2 });
    },

    'then there are 104 undealt cards': function(topic) {
      assert.lengthOf(topic._undealt, 104);
    },

    'then there are 0 dealt cards': function(topic) {
      assert.lengthOf(topic._dealt, 0);
    },

    'then there is an unshuffled deck with two of each card': function(topic) {
      var i = 0;
      for (var i = 0; i < 2; i++) {
        Card.suits.forEach(function(suit) {
          Card.ranks.forEach(function(rank) {
            var card = topic._undealt[i++];
            assert.equal(card.suit, suit);
            assert.equal(card.rank, rank);
          });
        });
      }
    }
  },

  'when constructing a deck with jokers and decks config parameters': {
    topic: function() {
      return new Deck({ jokers: 3, decks: 2 });
    },

    'then the number of jokers is not based on number of decks': function(topic) {
      assert.lengthOf(topic._undealt, 107);
    }
  }

}).export(module);

vows.describe('Deck.draw()').addBatch({

  'when two cards are drawn from a new deck': {
    topic: function() {
      var deck = new Deck();
      var card1 = deck.draw();
      var card2 = deck.draw();
      this.callback(deck, card1, card2);
    },

    'then the cards are removed from the undealt portion of the deck': function(deck, card1, card2) {
      assert.lengthOf(deck._undealt, 50);
      deck._undealt.forEach(function(card) {
        assert.isFalse(card.suit == card1.suit && card.rank == card1.rank);
        assert.isFalse(card.suit == card2.suit && card.rank == card2.rank);
      });
    },

    'then the cards are removed from the same side of the deck': function(deck, card1, card2) {
      assert.equal('heart', card1.suit);
      assert.equal(2, card1.rank);
      assert.equal('heart', card2.suit);
      assert.equal(3, card2.rank);
    },

    'then the cards are placed in the dealt portion of the deck': function(deck, card1, card2) {
      assert.lengthOf(deck._dealt, 2);
      assert.equal(deck._dealt[0].suit, card1.suit);
      assert.equal(deck._dealt[0].rank, card1.rank);
      assert.equal(deck._dealt[1].suit, card2.suit);
      assert.equal(deck._dealt[1].rank, card2.rank);
    }
  },

  'when a card is drawn from an empty deck': {
    topic: function() {
      var deck = new Deck();
      while (deck._undealt.length != 0) {
        try
        {
          deck.draw();
        }
        catch (e)
        {
          assert.isTrue(false);
        }
      }

      deck.draw();
    },

    'then an EmptyDeckError is thrown': function(e) {
      assert.instanceOf(e, EmptyDeckError);
    }
  }

}).export(module);

vows.describe('Deck.deal()').addBatch({

  'when deal is called with no parameters from a new deck': {
    topic: function() {
      var deck = new Deck();

      var hands = deck.deal();
      this.callback(deck, hands);
    },

    'then one hand with one card is returned': function(deck, hands) {
      assert.lengthOf(hands, 1);
      assert.lengthOf(hands[0], 1);
    },

    'then the card is removed from the undealt portion': function(deck, hands) {
      assert.lengthOf(deck._undealt, 51);
      deck._undealt.forEach(function(card) {
        assert.isFalse(hands[0][0].suit == card.suit && hands[0][0].rank == card.rank);
      });
    },

    'then the card is moved to the dealt portion': function(deck, hands) {
      assert.lengthOf(deck._dealt, 1);
    }
  },

  'when deal is called requesting four hands of three cards from a new deck': {
    topic: function() {
      var deck = new Deck();

      var hands = deck.deal(3, 4);
      this.callback(deck, hands);
    },

    'then four hands of three cards each are returned': function(deck, hands) {
      assert.lengthOf(hands, 4);
      hands.forEach(function(hand) {
        assert.lengthOf(hand, 3);
      });
    },

    'then twelve cards are dealt round robin': function(deck, hands) {
      assert.lengthOf(deck._dealt, 12);

      for (var handIndex = 0; handIndex < hands.length; handIndex++) {
        var hand = hands[handIndex];
        for (var cardIndex = 0; cardIndex < hand.length; cardIndex++) {
          var card = hand[cardIndex];

          // Hand 1 has 0, 4, 8.  Etc...
          var dealtCard = deck._dealt[cardIndex * hands.length + handIndex];
          assert.equal(dealtCard.suit, card.suit);
          assert.equal(dealtCard.rank, card.rank);
        }
      }
    }
  },

  'when deal is called requesting two hands of two cards from a deck with three cards': {
    topic: function() {
      var deck = new Deck();
      try
      {
        deck.deal(49, 1);
      }
      catch (e)
      {
          assert.isTrue(false);
      }

      deck.deal(2, 2);
    },

    'then an EmptyDeckError is thrown': function(e) {
      assert.instanceOf(e, EmptyDeckError);
    }
  }

}).export(module);

vows.describe('Deck.shuffle()').addBatch({

  'when a partially used deck is shuffled': {
    topic: function() {
      var deck = new Deck();
      deck.deal(30);

      var original_dealt = deck._dealt.slice();
      var original_undealt = deck._undealt.slice();
      deck.shuffle();
      this.callback(deck, original_dealt, original_undealt);
    },

    'then the dealt portion of the deck is not altered': function(deck, original_dealt, original_undealt) {
      assert.lengthOf(deck._dealt, 30);
      assert.lengthOf(deck._dealt, original_dealt.length);
      for (var i = 0; i < original_dealt.length; i++) {
        assert.equal(deck._dealt[i].suit, original_dealt[i].suit);
        assert.equal(deck._dealt[i].rank, original_dealt[i].rank);
      }
    },

    'then the cards in the undealt portion of the deck are still there (maybe shuffled)': function(deck, original_dealt, original_undealt) {
      assert.lengthOf(deck._undealt, 22);
      assert.lengthOf(deck._undealt, original_undealt.length);
      for (var i = 0; i < original_undealt.length; i++) {
        var found = false;
        for (var j = 0; j < deck._undealt.length; j++) {
          if (deck._undealt[j].suit == original_undealt[i].suit && deck._undealt[j].rank == original_undealt[i].rank) {
            found = true;
            break;
          }
        }
        assert.isTrue(found);
      }
    }
  }

}).export(module);

vows.describe('Deck.reset()').addBatch({

  'when reset is called on a partially used deck': {
    topic: function() {
      var deck = new Deck();
      deck.deal(30);

      deck.reset();
      return deck;
    },

    'then all cards are moved to the undealt portion of the deck': function(deck) {
      assert.lengthOf(deck._undealt, 52);
      assert.lengthOf(deck._dealt, 0);
    },

    'then all cards are still in the deck': function(deck) {
      var comparison_deck = new Deck();
      comparison_deck._undealt.forEach(function(card) {
        var found = false;
        for (var i = 0; i < deck._undealt.length; i++) {
          if (card.suit == deck._undealt[i].suit && card.rank == deck._undealt[i].rank) {
            found = true;
            break;
          }
        }
        assert.isTrue(found);
      });
    }
  }

}).export(module);