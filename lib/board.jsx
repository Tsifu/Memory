import React from 'react';

const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = ["spades", "hearts", "clubs", "diamonds"];

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.cards = [];
    this.createBoard();
  }

  createBoard() {
    VALUES.forEach(value => {
      SUITS.forEach(suit => {
        this.cards.push(new Card(value, suit));
      });
    });
  }
}

class Card extends React.Component {
  constructor(value, suit) {
    super(value, suit);

    this.value = value;
    this.suit = suit;
    this.revealed = false;
    this.matched = false;
  }
}

export default Board;
