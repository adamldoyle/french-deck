# French-Deck

Basic french deck of playing cards. Allows standard functionality like shuffling, dealing, and drawing. Provides no
game specific logic other than the set of cards.

## Installation

    $ npm install french-deck

## Usage

Construct a deck (or more than one deck) which will keep track of dealt and undealt cards.

    var deck = new Deck({ jokers: 1, decks: 2});

    deck.shuffle();

    var hands = deck.deal(2, 2);

    deck.draw();

    deck.reset();

## Examples

For a complete, working example, refer to the [texas hold'em example](https://github.com/adamldoyle/french-deck/tree/master/examples/texas hold'em).

## Tests

[![Build Status](https://secure.travis-ci.org/adamldoyle/french-deck.png)](http://travis-ci.org/adamldoyle/french-deck)

## Credits

  - [Adam Doyle](http://github.com/adamldoyle)

## License

(The MIT License)

Copyright (c) 2013 Adam Doyle

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.