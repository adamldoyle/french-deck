var Deck = require('french-deck').Deck;

// Construct new, unshuffled deck
var deck = new Deck();

// Shuffle the deck
deck.shuffle();

// Deal two cards to five people
var hands = deck.deal(2, 4);

// Deal the flop
var community = deck.deal(3);
console.log('After the flop: %s', community);

// Deal the turn
community.push(deck.draw());
console.log('After the turn: ' + community);

// Deal the river
community.push(deck.draw());
console.log('After the river: ' + community);

// Output the player hands
for (var i = 0; i < hands.length; i++) {
  console.log('Player ' + (i + 1) + '\'s hand: ' + hands[i]);
}

// Clear the hands and reset the deck
hands = Array();
deck.reset();