import React from 'react';
import Board from './board';
import Card from './card';
import Modal from 'react-modal';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, .9)'
  },
  content : {
    top                   : '40%',
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
      interval: 0,
      modalIsOpen: false,
      modal2IsOpen: false,
      modal3IsOpen: true,
      gameMode: "normal",
      name: ""
    };

    this.name = "";
    this.checkCard = this.checkCard.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openModal3 = this.openModal3.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
    this.closeModal3 = this.closeModal3.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.startGame = this.startGame.bind(this);
    this.update = this.update.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  componentDidMount() {
    this.props.fetchGiphy();
    window.clearInterval(this.state.interval);
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
        if (this.state.score === 3) {
          this.openModal();
        }
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

  resetGame() {
    this.board = new Board();
    window.clearInterval(this.timeInterval);
    clearInterval(this.timeInterval);
    this.setState({
      score: 0,
      firstCard: null,
      secondCard: null,
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: 0,
      gameMode: "normal",
      name: ""
    });
  }

  restartGame() {
    this.board = new Board();
    window.clearInterval(this.timeInterval);
    clearInterval(this.timeInterval);
    this.setState({
      score: 0,
      firstCard: null,
      secondCard: null,
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: 0,
      gameMode: "normal",
      modal3IsOpen: true,
      name: ""
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });

    setTimeout(() => {
      this.setState({ modalIsOpen: false});
      this.setState({ modal2IsOpen: true});
      this.time = this.convertTime();
      this.resetGame();
    }, 2000);
  }

  closeModal() {
    this.setState({modalIsOpen: false });
  }

  closeModal2() {
    this.setState({
      modal2IsOpen: false,
      modal3IsOpen: true,
      gameMode: "normal"
    });
  }

  closeModal3() {
    this.board = new Board(this.state.gameMode);
    this.setState({modal3IsOpen: false });
  }

  openModal3() {
    this.setState({ modal3IsOpen: true });
  }

  selectMode(e) {
    this.setState({ gameMode: e.currentTarget.value });
  }

  startGame() {
    console.log(this.state.gameMode);
  }

  update(input_type) {
    return (
      event => {
        this.setState( {[input_type]: event.target.value });
      }
    );
  }

  render() {
    let cards = this.board.cards.map((card, idx) => {
      return (<li key={idx} onClick={() => this.checkCard(<Card card={card}/>)}><Card card={card}/></li>);
    });

    let time = this.convertTime();

    let giphy;
    if (this.props.giphy) {
      giphy = this.props.giphy.data[0].images.fixed_height.url;
    }

    let winner = this.state.name;
    let score = this.state.score;

    let klass = this.state.gameMode === "normal" ? "main-content" : "main-easy";

    return (
      <div className="body">
      <header>
        <div className="header-content">

          <div className="score-board">
            <div className="scoreTitle text-align">
              Matched Pair
            </div>
            <div className="current-score  text-align">
              {this.state.score}
            </div>

            <div className="text-align">
              <button className="restart-game" onClick={this.restartGame}>Reset</button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className={klass}>
          <ul className="board">
            {cards}
          </ul>
        </div>

      </main>

      <footer>
        <div className="footer-content">
          <div>
            Contact Me at:
          </div>
          <div className="social">
            <ul>
              <li><a href="mailto:tsi.lung@gmail.com" className="icon fa-envelope"><span>Email</span></a></li>
              <li><a href="https://www.linkedin.com/in/tsi-yang-lung-43528313/" className="icon fa-linkedin"><span>LinkedIn</span></a></li>
              <li><a href="https://github.com/Tsifu" className="icon fa-github"><span>Github</span></a></li>
              <li><a href="https://angel.co/tsi-lung" className="icon fa-angellist"><span>Angellist</span></a></li>
            </ul>
          </div>
        </div>
      </footer>

      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="celebrate"
          >
        <div className="celebration"><img src={giphy}/></div>

      </Modal>

      <Modal
          isOpen={this.state.modal2IsOpen}
          onRequestClose={this.closeModal2}
          style={customStyles}
          contentLabel="score-top-ten"
          >
        <div className="congrats-modal">
          <div className="congrats-title">
            Congrats, You win!!!!!
          </div>
            <div className="congrats-winner">
                {winner}
            </div>
          <div className="exit-div">
            <button className="exit-button" onClick={this.closeModal2}>Exit</button>
          </div>
        </div>

      </Modal>

      <Modal
          isOpen={this.state.modal3IsOpen}
          onRequestClose={this.closeModal3}
          style={customStyles}
          contentLabel="game-mode"
          >

          <div className="select-modal">
            <div className="welcome-sign">Welcome!</div>

            <div className="select-mode1">
              Select Mode:
              <select className="select-option" onChange={this.selectMode}>
                <option value="normal">Normal</option>
                <option value="easy">Easy</option>
              </select>
            </div>

            <div className="select-mode1">
              Enter Name:
                <input
                  className="name-input"
                  type="text"
                  value={this.state.name}
                  placeholder=" Enter Name"
                  onChange={this.update('name')}
                  />

            </div>

            <div className="go">
              <button className="go-button" onClick={this.closeModal3}>Start Game</button>
            </div>

          </div>

      </Modal>

      </div>


    );
  }
}

export default Game;
