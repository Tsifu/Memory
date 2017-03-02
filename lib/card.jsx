import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.value = this.props.card.value;
    this.suit = this.props.card.suit;

    this.state = {
      flipCard: "card"
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.card.revealed === true) {
      this.setState({flipCard: "card"});
    }
  }

  handleClick() {
    let css = (this.state.flipCard === "card") ? "card card-flipped" : "card";
    this.setState({ flipCard: css });
  }

  revealed() {
    console.log("hello");
  }

  hide() {
    this.reveal = false;
  }

  render() {
    const back = `assets/cards/${this.value}${this.suit}.svg`;
    const front = `assets/cards/back.svg`;

    return (
      <div className="container">
        <div className={this.state.flipCard} onClick={this.handleClick}>
          <div className="front"><img src={front}></img></div>
          <div className="back"><img src={back}></img></div>
        </div>
      </div>
    );
  }
}

export default Card;
