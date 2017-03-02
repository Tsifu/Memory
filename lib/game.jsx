import React from 'react';
import Board from './board';
import Card from './card';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.board = new Board();

    this.state = {
      turn: 0,
      cardSelections: []
    };

    this.testSomething = this.testSomething.bind(this);
  }

  testSomething() {
    this.state.cardSelections[0].props.card.matched = true;
    this.state.cardSelections[1].props.card.matched = true;
    this.setState({ cardSelections: [] });

    if (this.state.cardSelections.length === 1) {
      this.state.cardSelections[0].props.card.revealed = true;
    } else if (this.state.cardSelections.length === 2) {
      let card1 = this.state.cardSelections[0];
      let card2 = this.state.cardSelections[1];

      if (card1.value === card2.value) {
        card1.props.card.matched = true;
        card2.props.card.matched = true;
        this.setState({ cardSelections: [] });
      } else {
        card2.props.card.revealed = true;

        setTimeout(() => {
          card1.props.card.revealed = false;
          card2.props.card.revealed = false;
          this.setState({ cardSelections: [] });
        }, 3000);
      }
    }
  }

  render() {
    let cards = this.board.cards.map((card, idx) => {
      let cardComponent = <Card ref="child" card={card}/>;

      return (<li key={idx} onClick={() => this.state.cardSelections.push(cardComponent)}>{cardComponent}</li>);
    });

    return (
      <div>
      <header>Welcome!

      </header>

      <main>
        <ul className="board">
          {cards}
        </ul>
        <button onClick={this.testSomething}>Flip Back</button>
      </main>
      </div>
    );
  }
}

export default Game;
