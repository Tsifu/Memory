import React from 'react';

const EVALUES = ["A", "2", "10", "K"];
const ESUITS = ["spades", "hearts"];

const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = ["spades", "hearts", "clubs", "diamonds"];

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.cards = [];
    this.createBoard();
  }

  createBoard() {
    let values = VALUES;
    let suits = SUITS;

    if (this.props === "easy") {
      values = EVALUES;
      suits = ESUITS;
    }

    values.forEach(value => {
      suits.forEach(suit => {
        this.cards.push(new Card(value, suit));
      });
    });

    this.shuffleCards();
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
    }
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
