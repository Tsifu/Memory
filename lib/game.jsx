import React from 'react';
import Board from './board';
import Card from './card';
import Modal from 'react-modal';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 10,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.6)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : '1px solid #ccc',
    borderRadius          : '4px',
    padding               : '0px',


  }
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.board = new Board();

    this.state = {
      score: 0,
      firstCard: null,
      secondCard: null,
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: null,
      modalIsOpen: false
    };

    this.checkCard = this.checkCard.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  checkCard(cardComponent) {
    if (this.state.seconds === 0) {
      this.setTimer();
    }

    if (this.state.firstCard === null) {
      cardComponent.props.card.revealed = true;
      this.setState({ firstCard: cardComponent});
    } else if (this.state.firstCard && this.state.secondCard === null) {
      let card1 = this.state.firstCard;
      let card2 = cardComponent;
      card2.props.card.revealed = true;
      this.setState({ secondCard: true});

      if (card1.props.card.value === card2.props.card.value) {
        card1.props.card.matched = true;
        card2.props.card.matched = true;
        this.setState({
          firstCard: null,
          secondCard: null,
          score: this.state.score + 1
        });
      } else {


        setTimeout(() => {
          card1.props.card.revealed = false;
          card2.props.card.revealed = false;
          this.setState({ firstCard: null });
          this.setState({ secondCard: null });
        }, 1500);
      }
    }
  }

  setTimer() {
    this.setState({
      interval: setInterval(this._tick.bind(this), 1000)
    });
  }

  _tick() {
    this._incrementSeconds();
  }

  _incrementSeconds() {
    this.setState({ seconds: this.state.seconds + 1});

    if (this.state.seconds === 60) {
      this.setState({ seconds: 0});
      this._incrementMinutes();
    }
  }

  _incrementMinutes() {
    this.setState({ minutes: this.state.minutes + 1});

    if (this.minutes === 60) {
      this.minutes = 0;
      this._incrementHours();
    }
  }

  _incrementHours() {
    this.setState({ hours: (this.state.hours + 1) % 24 });
  }

  convertTime() {
    let sec = this.state.seconds;
    let min = this.state.minutes;
    let hr = this.state.hours;

    if (sec < 10) {
      sec = `0${sec}`;
    } else {
      sec = `${sec}`;
    }

    if (min < 10) {
      min = `0${min}`;
    } else {
      min = `${min}`;
    }

    if (hr < 10) {
      hr = `0${hr}`;
    } else {
      hr = `${hr}`;
    }

    return `${hr}:${min}:${sec}`;
  }

  resetGame() {
    this.board = new Board();
    window.clearInterval(this.state.interval);

    this.setState({
      score: 0,
      firstCard: null,
      secondCard: null,
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: clearInterval(this.state.interval)
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({modalIsOpen: false });
      this.clearState();
  }

  render() {
    let cards = this.board.cards.map((card, idx) => {
      let cardComponent = <Card card={card}/>;
      return (<li key={idx} onClick={() => this.checkCard(cardComponent)}>{cardComponent}</li>);
    });

    let time = this.convertTime();

    return (
      <div className="body">
      <header>
        <div className="header-content">
          Welcome!

          <div className="scoreBoard">
            <div className="scoreTitle">
              Score
            </div>
            <div className="currentScore">
              {this.state.score}
            </div>
          </div>

          <div className="game-setting">
            <h1><time>{time}</time></h1>
            <button className="restart-game" onClick={this.resetGame}>Reset</button>
          </div>
        </div>
      </header>

      <main>
        <div className="main-content">
          <ul className="board">
            {cards}
          </ul>

          <div>
            <button onClick={this.openModal}>Modal</button>
          </div>
        </div>

      </main>

      <footer>
        <div className="footer-content">
          more about the creator
        </div>
      </footer>

      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="celebrate"
          >
        <div>Hello World</div>

      </Modal>
      </div>


    );
  }
}

export default Game;
