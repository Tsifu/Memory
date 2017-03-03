import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.value = this.props.card.value;
    this.suit = this.props.card.suit;

    this.state = {
      flipCard: "card"
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.card.matched === true) {
      this.setState({ flipCard: "card card-flipped" });
    } else if (newProps.card.revealed === true) {
      this.setState({ flipCard: "card card-flipped"});
    } else if (newProps.card.revealed === false) {
      this.setState({ flipCard: "card"});
    }
  }

  render() {
    const back = `assets/cards/${this.value}${this.suit}.svg`;
    const front = `assets/cards/back.svg`;

    return (
      <div className="container">
        <div className={this.state.flipCard}>
          <div className="front"><img src={front}></img></div>
          <div className="back"><img src={back}></img></div>
        </div>
      </div>
    );
  }
}

export default Card;
